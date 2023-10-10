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

        [HttpPost]
        [Authorize]
        [ProducesResponseType(typeof(ActivitiesSummary), StatusCodes.Status201Created)]
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
                    return NotFound();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating ActivitiesSummary.");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
