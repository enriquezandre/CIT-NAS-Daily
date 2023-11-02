using CITNASDaily.Entities.Dtos.SummaryEvaluationDtos;
using CITNASDaily.Entities.Models;
using CITNASDaily.Services.Contracts;
using CITNASDaily.Services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetSummaryEvaluations()
        {
            try
            {
                var summaryEval = await _summaryEvaluationService.GetSummaryEvaluationsAsync();
                if (summaryEval.IsNullOrEmpty()) return NoContent();

                return Ok(summaryEval);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting summary evaluations.");

                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpGet("{nasId}", Name = "GetSummaryEvaluation")]
        [Authorize]
        public async Task<IActionResult> GetSummaryEvaluationWithNASId(int nasId)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null) return Forbid();

                var summaryEval = await _summaryEvaluationService.GetSummaryEvaluationWithNASIdAsync(nasId);

                if (summaryEval == null)
                {
                    return NotFound("No summary evaluation yet.");
                }

                return Ok(summaryEval);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting summary evaluation.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType(typeof(SummaryEvaluation), StatusCodes.Status201Created)]
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
