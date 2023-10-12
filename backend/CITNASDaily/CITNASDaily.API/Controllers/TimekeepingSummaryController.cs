using CITNASDaily.Entities.Dtos.TimekeepingSummaryDtos;
using CITNASDaily.Entities.Models;
using CITNASDaily.Services.Contracts;
using CITNASDaily.Services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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

        [HttpPost]
        [Authorize]
        [ProducesResponseType(typeof(TimekeepingSummary), StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateTimekeepingSummary([FromBody] TimekeepingSummaryCreateDto timekeepingSummaryCreate)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var createdTimekeepingSummary = await _timekeepingSummaryService.CreateTimekeepingSummaryAsync(timekeepingSummaryCreate);

                if (createdTimekeepingSummary == null)
                {
                    return BadRequest("Creatiion Failed.");
                }

                return Ok(createdTimekeepingSummary);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating Timekeeping Summary.");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
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

        [HttpGet("{nasId}", Name = "GetAllTimekeepingSummary")]
        [Authorize]
        public async Task<IActionResult> GetAllTimekeepingSummary(int nasId)
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
    }
}
