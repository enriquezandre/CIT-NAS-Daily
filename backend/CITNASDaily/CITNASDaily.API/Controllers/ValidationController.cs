using CITNASDaily.Entities.Dtos.NASDtos;
using CITNASDaily.Entities.Dtos.ValidationDtos;
using CITNASDaily.Entities.Models;
using CITNASDaily.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CITNASDaily.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValidationController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IValidationService _validationService;
        private readonly ILogger<ValidationController> _logger;

        public ValidationController(IAuthService authService, IValidationService validationService, ILogger<ValidationController> logger)
        {
            _authService = authService;
            _validationService = validationService;
            _logger = logger;
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType(typeof(Validation), StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateValidation([FromBody] ValidationCreateDto validationCreate)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var createdValidation = await _validationService.CreateValidaitonAsync(validationCreate);

                if (createdValidation == null)
                {
                    return NotFound();
                }

                return CreatedAtRoute("GetValidation", new { validationId = createdValidation.Id }, createdValidation);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating Validation.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }
    }
}
