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
        public async Task<IActionResult> GetAllDTR()
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

        [HttpGet("{year}/{semester}/{lastName}/{firstName}", Name = "GetAllDTRBySYSem")]
        [Authorize]
        public async Task<IActionResult> GetAllDTRBySYSem(int year, int semester, string lastName, string firstName, [FromQuery] string middleName = "")
        {
            try
            {
                var dtr = await _dtrService.GetDTRsBySYSemesterAsync(year, (Semester)semester, lastName, firstName, middleName);

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
            try
            {
                await _dtrService.SaveDTRs(file, year, (Semester)semester);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving DTR.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpGet("GetByNasName/{lastName}/{firstName}")]
        [Authorize]
        public async Task<IActionResult> GetByNasName(string lastName, string firstName, [FromQuery] string middleName = "")
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }
                var fullName = string.IsNullOrEmpty(middleName) ? $"{lastName} {firstName}" : $"{lastName} {middleName} {firstName}";
                var dtr = await _dtrService.GetDTRByNasNameAsync(lastName, firstName, middleName);

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
