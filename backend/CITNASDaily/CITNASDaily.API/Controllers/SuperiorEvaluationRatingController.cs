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
        private readonly ILogger<SuperiorEvaluationRatingController> _logger;

        public SuperiorEvaluationRatingController(IAuthService authService, ISuperiorEvaluationRatingService superiorEvaluationRatingervice, ILogger<SuperiorEvaluationRatingController> logger)
        {
            _authService = authService;
            _superiorEvaluationRatingService = superiorEvaluationRatingervice;
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

                var createdSuperiorEvaluationRating = await _superiorEvaluationRatingService.CreateSuperiorEvaluationRatingAsync(superiorEvaluationRatingCreate);

                if (createdSuperiorEvaluationRating == null)
                {
                    return BadRequest("Creation Failed.");
                }
                
                return Ok(createdSuperiorEvaluationRating);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating Superior Evaluation Rating.");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet(Name = "GetSuperiorEvaluationRatingWithNASIdAndSemesterAsync")]
        [Authorize]
        public async Task<IActionResult> GetSuperiorEvaluationRatingWithNASIdAndSemesterAsync(int nasId, Semester semester)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var superiorEvaluationRating = await _superiorEvaluationRatingService.GetSuperiorEvaluationRatingWithNASIdAndSemesterAsync(nasId, semester);

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
