using CITNASDaily.Entities.Dtos.SuperiorEvaluationRatingDto;
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
    }
}
