using CITNASDaily.Entities.Dtos.ActivitiesSummaryDtos;
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
        /// <summary>
        /// Creates activities summary
        /// </summary>
        /// <param name="activitiesSummaryCreate"></param>
        /// <returns>Newly created activities summary</returns>
        /// <response code="201">Successfully created activities summary</response>
        /// <response code="400">act summary details are invalid</response>
        /// <response code="500">Internal server error</response>
        /// <response code="403">Forbidden error</response>
        [HttpPost]
        [Authorize]
        [ProducesResponseType(typeof(ActivitiesSummary), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateActivitiesSummary([FromBody] ActivitiesSummaryCreateDto activitiesSummaryCreate)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var createdActivitiesSummary = await _activitiesSummaryService.CreateActivitiesSummaryAsync(activitiesSummaryCreate);

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
        /// <summary>
        /// Gets all activities summary
        /// </summary>
        /// <returns>All activities summary</returns>
        /// <response code="200">Successfully retrieved created activities summary</response>
        /// <response code="400">act summary details are invalid</response>
        /// <response code="500">Internal server error</response>
        /// <response code="403">Forbidden error</response>
        [HttpGet]
        [Authorize]
        [ProducesResponseType(typeof(ActivitiesSummary), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllActivitiesSummary()
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }
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
        /// <summary>
        /// Gets an activities summary by nasId
        /// </summary>
        /// <param name="nasId"></param>
        /// <returns>an activities summary</returns>
        /// <response code="200">Successfully retrieved created activities summary</response>
        /// <response code="404">act summary not found</response>
        /// <response code="500">Internal server error</response>
        /// <response code="403">Forbidden error</response>
        [HttpGet("{nasId}", Name = "GetAllActivitiesSummary")]
        [Authorize]
        [ProducesResponseType(typeof(ActivitiesSummary), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllActivitiesSummary(int nasId)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }
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
        /// <summary>
        /// Gets an activities summary by nasId, month, and year
        /// </summary>
        /// <param name="nasId"></param>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <returns>an activities summary</returns>
        /// <response code="200">Successfully retrieved created activities summary</response>
        /// <response code="404">act summary not found</response>
        /// <response code="500">Internal server error</response>
        /// <response code="403">Forbidden error</response>
        [HttpGet("{nasId}/{year}/{month}", Name = "GetAllActivitiesSummaryByNASIdMonthYear")]
        [Authorize]
        [ProducesResponseType(typeof(ActivitiesSummary), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllActivitiesSummary(int nasId, int month, int year)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }
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
    }
}
