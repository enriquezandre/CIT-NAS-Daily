using CITNASDaily.Entities.Models;
using CITNASDaily.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OfficeOpenXml;
using System.Security.Claims;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DTRController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IDTRService _dtrService;
        private readonly ILogger<DTRController> _logger;

        public DTRController(IAuthService authService, IDTRService dtrService, ILogger<DTRController> logger)
        {
            _authService = authService;
            _logger = logger;
            _dtrService = dtrService;
        }

        [HttpGet(Name = "GetAllDTR")]
        [Authorize]
        public async Task<IActionResult> GetAllNAS()
        {
            try
            {
                var dtr = await _dtrService.GetAllDTRAsync();

                if (dtr.IsNullOrEmpty())
                {
                    return NotFound("There are no DTRs.");
                }

                return Ok(dtr);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting DTR.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpGet("{year}/{semester}/{firstName}/{lastName}", Name = "GetAllDTRBySYSem")]
        [Authorize]
        public async Task<IActionResult> GetAllDTRBySYSem(int year, int semester, string firstName, string lastName, [FromQuery] string middleName = "")
        {
            try
            {
                var dtr = await _dtrService.GetDTRsBySYSemesterAsync(year, (Semester)semester, firstName, lastName, middleName);

                if (dtr == null)
                {
                    return NotFound("There are no DTRs.");
                }

                return Ok(dtr);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting DTR.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpPost("UploadExcel/{year}/{semester}")]
        public async Task<IActionResult> UploadExcel(IFormFile file, int year, int semester)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                using (var package = new ExcelPackage(stream))
                {
                    ExcelWorksheet worksheet = package.Workbook.Worksheets[0]; // assuming you only have one worksheet
                    List<DailyTimeRecord> records = new List<DailyTimeRecord>();

                    // iterate through the worksheet rows and columns
                    for (int i = worksheet.Dimension.Start.Row + 1; i <= worksheet.Dimension.End.Row; i++)
                    {
                        DailyTimeRecord record = new DailyTimeRecord
                        {
                            FirstName = worksheet.Cells[i, 1].Value?.ToString(),
                            MiddleName = worksheet.Cells[i, 2].Value?.ToString(),
                            LastName = worksheet.Cells[i, 3].Value?.ToString(),
                            Date = worksheet.Cells[i, 4].Value?.ToString(),
                            TimeIn = worksheet.Cells[i, 5].Value?.ToString(),
                            TimeOut = worksheet.Cells[i, 6].Value?.ToString(),
                            OvertimeIn = worksheet.Cells[i, 7].Value?.ToString(),
                            OvertimeOut = worksheet.Cells[i, 8].Value?.ToString(),
                            WorkTime = worksheet.Cells[i, 9].Value?.ToString(),
                            TotalWorkTime = worksheet.Cells[i, 10].Value?.ToString(),
                            SchoolYear = year,
                            Semester = (Semester) semester
                        };

                        records.Add(record);
                    }

                    await _dtrService.SaveDTRs(records);
                }
            }

            return Ok();
        }

        [HttpGet("GetByNasName/{firstName}/{lastName}")]
        [Authorize]
        public async Task<IActionResult> GetByNasName(string firstName, string lastName, [FromQuery] string middleName = "")
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }
                var fullName = string.IsNullOrEmpty(middleName) ? $"{firstName} {lastName}" : $"{firstName} {middleName} {lastName}";
                var dtr = await _dtrService.GetDTRByNasNameAsync(firstName, lastName, middleName);

                if (dtr == null || !dtr.Any())
                {
                    return NotFound($"There are no DTRs for NasName: {fullName}.");
                }

                return Ok(dtr);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting DTR by NasName.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

    }
}
