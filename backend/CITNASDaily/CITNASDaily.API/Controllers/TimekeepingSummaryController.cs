using CITNASDaily.Entities.Dtos.NASDtos;
using CITNASDaily.Entities.Dtos.TimekeepingSummaryDtos;
using CITNASDaily.Entities.Models;
using CITNASDaily.Services.Contracts;
using CITNASDaily.Services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimekeepingSummaryController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ITimekeepingSummaryService _timekeepingSummaryService;
        private readonly ILogger<TimekeepingSummaryController> _logger;
        public TimekeepingSummaryController(IAuthService authService, ITimekeepingSummaryService timekeepingSummaryervice, ILogger<TimekeepingSummaryController> logger)
        {
            _authService = authService;
            _timekeepingSummaryService = timekeepingSummaryervice;
            _logger = logger;
        }

        [HttpPost("{nasId}/{year}/{semester}")]
        [Authorize]
        [ProducesResponseType(typeof(TimekeepingSummary), StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateTimekeepingSummary([FromBody] TimekeepingSummaryCreateDto timekeepingSummaryCreate, int nasId, int year, int semester)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var createdTimekeepingSummary = await _timekeepingSummaryService.CreateTimekeepingSummaryAsync(timekeepingSummaryCreate, nasId, year, (Semester)semester);

                if (createdTimekeepingSummary == null)
                {
                    return BadRequest("Creation Failed.");
                }

                return CreatedAtRoute("GetAllTimekeepingSummaryByNASId", new { nasId = createdTimekeepingSummary.NASId }, createdTimekeepingSummary);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating Timekeeping Summary.");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet(Name = "GetAllTimekeepingSummary")]
        public async Task<IActionResult> GetAllTimekeepingSummary()
        {
            try
            {
                var activitiesSummaries = await _timekeepingSummaryService.GetAllTimekeepingSummaryAsync();
                if (activitiesSummaries == null) return BadRequest();
                return Ok(activitiesSummaries);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error encountered when retrieving all Activities Summaries.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpGet("{nasId}", Name = "GetAllTimekeepingSummaryByNASId")]
        [Authorize]
        public async Task<IActionResult> GetAllTimekeepingSummaryByNASId(int nasId)
        {
            try
            {
                var actSummaries = await _timekeepingSummaryService.GetAllTimekeepingSummaryByNASIdAsync(nasId);

                if (actSummaries == null)
                {
                    return NotFound();
                }

                return Ok(actSummaries);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting Superior.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpGet("{nasId}/{year}/{semester}", Name = "GetTimekeepingSummaryByNASIdSemesterYear")]
        [Authorize]
        public async Task<IActionResult> GetTimekeepingSummaryByNASIdSemesterYear(int nasId, int semester, int year)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null) return Forbid();

                var summaryEval = await _timekeepingSummaryService.GetTimekeepingSummaryByNASIdSemesterYearAsync(nasId, (Semester)semester, year);

                if (summaryEval == null)
                {
                    return NotFound("No timekeeping summary yet.");
                }

                return Ok(summaryEval);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting timekeeping summary.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpPut("{nasId}/{year}/{semester}", Name = "UpdateTimekeepingSummary")]
        [Authorize]
        public async Task<IActionResult> UpdateTimekeepingSummary(int nasId, int year, int semester, [FromBody] TimekeepingSummaryUpdateDto tkUpdate)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }
                var tk = await _timekeepingSummaryService.UpdateTimekeepingSummaryAsync(nasId, year, (Semester) semester, tkUpdate);
                if (tk == null)
                {
                    return BadRequest("Failed to Update timekeeping summary");
                }
                return Ok(tk);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating timekeeping summary.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }
    }
}
