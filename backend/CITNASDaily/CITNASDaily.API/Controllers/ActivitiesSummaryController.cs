using CITNASDaily.Entities.Dtos.ActivitiesSummaryDtos;
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
    public class ActivitiesSummaryController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IActivitiesSummaryService _activitiesSummaryService;
        private readonly ILogger<ActivitiesSummaryController> _logger;

        public ActivitiesSummaryController(IAuthService authService, IActivitiesSummaryService activitiesSummaryervice, ILogger<ActivitiesSummaryController> logger)
        {
            _authService = authService;
            _activitiesSummaryService = activitiesSummaryervice;
            _logger = logger;
        }

        [HttpPost("{nasId}/{year}/{semester}")]
        [Authorize]
        [ProducesResponseType(typeof(ActivitiesSummary), StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateActivitiesSummary([FromBody] ActivitiesSummaryCreateDto activitiesSummaryCreate, int nasId, int year, int semester)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var createdActivitiesSummary = await _activitiesSummaryService.CreateActivitiesSummaryAsync(activitiesSummaryCreate, nasId, year, (Semester)semester);

                if (createdActivitiesSummary == null)
                {
                    return BadRequest("Creatiion Failed.");
                }

                return Ok(createdActivitiesSummary);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating ActivitiesSummary.");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllActivitiesSummary()
        {
            try
            {
                var activitiesSummaries = await _activitiesSummaryService.GetAllActivitiesSummaryAsync();
                if (activitiesSummaries == null) return BadRequest();
                return Ok(activitiesSummaries);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error encountered when retrieving all Activities Summaries.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpGet("{nasId}", Name = "GetAllActivitiesSummary")]
        [Authorize]
        public async Task<IActionResult> GetAllActivitiesSummary(int nasId)
        {
            try
            {
                var actSummaries = await _activitiesSummaryService.GetAllActivitiesSummaryByNASIdAsync(nasId);

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

        [HttpGet("GetByMonth/{nasId}/{year}/{month}", Name = "GetAllActivitiesSummaryByNASIdMonthYear")]
        [Authorize]
        public async Task<IActionResult> GetAllActivitiesSummaryByNASIdMonthYear(int nasId, int month, int year)
        {
            try
            {
                var actSummaries = await _activitiesSummaryService.GetAllActivitiesSummaryByNASIdMonthYearAsync(nasId, month, year);

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

        [HttpGet("{nasId}/{year}/{semester}", Name = "GetAllActivitiesSummaryByNASIdYearSemester")]
        [Authorize]
        public async Task<IActionResult> GetAllActivitiesSummaryByNASIdYearSemester(int nasId, int year, int semester)
        {
            try
            {
                var actSummaries = await _activitiesSummaryService.GetAllActivitiesSummaryByNASIdYearSemesterAsync(nasId, year, (Semester)semester);

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
    }
}
