using CITNASDaily.Entities.Dtos.SummaryEvaluationDtos;
using CITNASDaily.Services.Contracts;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CITNASDaily.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SummaryEvaluationController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ISummaryEvaluationService _summaryEvaluationService;
        private readonly ILogger<SuperiorEvaluationRatingController> _logger;

        public SummaryEvaluationController(IAuthService authService, ISummaryEvaluationService summaryEvaluationService, ILogger<SuperiorEvaluationRatingController> logger)
        {
            _authService = authService;
            _summaryEvaluationService = summaryEvaluationService;
            _logger = logger;
        }

        public async Task<IActionResult> CreateSummaryEvaluation([FromBody] SummaryEvaluationCreateDto summary)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var summaryEval = await _summaryEvaluationService.CreateSummaryEvaluationAsync(summary);

                if (summaryEval == null)
                {
                    return BadRequest("Creation Failed.");
                }

                return Ok(summaryEval);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error creating summary evaluation.");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
