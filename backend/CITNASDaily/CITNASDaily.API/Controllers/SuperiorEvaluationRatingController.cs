using CITNASDaily.Entities.Dtos.SummaryEvaluationDtos;
using CITNASDaily.Entities.Dtos.SuperiorEvaluationRatingDto;
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
    public class SuperiorEvaluationRatingController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ISuperiorEvaluationRatingService _superiorEvaluationRatingService;
        private readonly ISummaryEvaluationService _summaryEvaluationService;
        private readonly ILogger<SuperiorEvaluationRatingController> _logger;

        public SuperiorEvaluationRatingController(IAuthService authService, ISuperiorEvaluationRatingService superiorEvaluationRatingervice, ISummaryEvaluationService summaryEvaluationService, ILogger<SuperiorEvaluationRatingController> logger)
        {
            _authService = authService;
            _superiorEvaluationRatingService = superiorEvaluationRatingervice;
            _summaryEvaluationService = summaryEvaluationService;
            _logger = logger;
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType(typeof(SuperiorEvaluationRating), StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateSuperiorEvaluationRating([FromBody] SuperiorEvaluationRatingCreateDto superiorEvaluationRatingCreate)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var rating = await _superiorEvaluationRatingService.CreateSuperiorEvaluationRatingAsync(superiorEvaluationRatingCreate);

                if (rating == null)
                {
                    return BadRequest("Creation Failed.");
                }

                var summary = await _summaryEvaluationService.UpdateSuperiorRatingAsync(rating.NASId, rating.SchoolYear, rating.Semester, rating.OverallRating);

                if (summary == null)
                {
                    return BadRequest("Updating Overall Rating Failed.");
                }

                return CreatedAtRoute("GetSuperiorEvaluationRatingByNASIdAndSemesterAndSchoolYear", new { nasId = rating.NASId, semester = rating.Semester, year = rating.SchoolYear }, rating);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating Superior Evaluation Rating.");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet(Name = "GetSuperiorEvaluationRatingByNASIdAndSemesterAndSchoolYear")]
        [Authorize]
        public async Task<IActionResult> GetSuperiorEvaluationRatingByNASIdAndSemesterAndSchoolYear(int nasId, Semester semester, int year)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var superiorEvaluationRating = await _superiorEvaluationRatingService.GetSuperiorEvaluationRatingByNASIdAndSemesterAndSchoolYearAsync(nasId, semester, year);

                if (superiorEvaluationRating == null)
                {
                    return BadRequest("No Rating Yet.");
                }

                return Ok(superiorEvaluationRating);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting Superior Evaluation Rating.");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
