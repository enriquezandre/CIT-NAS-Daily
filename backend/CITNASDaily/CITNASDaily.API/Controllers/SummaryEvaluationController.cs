using CITNASDaily.Entities.Dtos.SummaryEvaluationDtos;
using CITNASDaily.Entities.Models;
using CITNASDaily.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using static CITNASDaily.Entities.Enums.Enums;

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

        #region CreateSummaryEvaluation

        [HttpPost]
        [Authorize(Roles = "OAS")]
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
                    return BadRequest("Summary Evaluation creation failed.");
                }

                return CreatedAtRoute("GetSummaryEvaluationByNASId", new { nasId = summaryEval.nasId }, summaryEval);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating summary evaluation.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        #endregion

        #region GetSummaryEvaluation

        [HttpGet]
        [Authorize(Roles = "OAS")]
        public async Task<IActionResult> GetSummaryEvaluations()
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var summaryEval = await _summaryEvaluationService.GetSummaryEvaluationsAsync();
                if (summaryEval.IsNullOrEmpty())
                {
                    return NotFound("No Summary Evaluations Found");
                }

                return Ok(summaryEval);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to retrieve summary evaluations.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpGet("{year}/{semester}/{nasId}", Name = "GetSummaryEvaluationByNASId")]
        [Authorize(Roles = "OAS, Superior, NAS")]
        public async Task<IActionResult> GetSummaryEvaluationByNASIdSemesterYear(int nasId, Semester semester, int year)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var summaryEval = await _summaryEvaluationService.GetSummaryEvaluationByNASIdSemesterYearAsync(nasId, semester, year);

                if (summaryEval == null)
                {
                    return NotFound($"No Summary Evaluation found for NAS ID #{nasId} with the specified semester and year.");
                }

                return Ok(summaryEval);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to retrieve summary evaluation.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpGet("grades/{nasId}/{year}/{semester}", Name = "GetNASGradePicture")]
        [Authorize(Roles = "OAS, Superior")]
        public async Task<IActionResult> GetNASGradePicture(int nasId, int year, int semester)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                if (!(Enum.IsDefined(typeof(Semester), semester)))
                {
                    return UnprocessableEntity("Invalid semester input.");
                }

                var nasGrades = await _summaryEvaluationService.GetNASGradePicture(nasId, year, (Semester)semester);
                if (nasGrades == null)
                {
                    return NotFound($"No grades found for NAS ID #{nasId} with the specified semester and year");
                }

                return Ok(nasGrades);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retreiving grades.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        #endregion

        #region PutSummaryEvaluation

        [HttpPut]
        [Authorize(Roles = "OAS")]
        public async Task<IActionResult> UpdateSummaryEvaluation([FromBody] SummaryEvaluationUpdateDto summary)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var summaryEval = await _summaryEvaluationService.UpdateSummaryEvaluationAsync(summary);

                if (summaryEval == null)
                {
                    return BadRequest("Summary Evaluation Update Failed.");
                }

                return Ok(summaryEval);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating summary evaluation.");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        #endregion
    }
}
