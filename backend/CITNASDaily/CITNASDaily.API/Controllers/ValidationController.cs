using CITNASDaily.Entities.Dtos.NASDtos;
using CITNASDaily.Entities.Dtos.ValidationDtos;
using CITNASDaily.Entities.Models;
using CITNASDaily.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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
        [Authorize(Roles = "OAS, NAS")]
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

                var createdValidation = await _validationService.CreateValidationAsync(validationCreate);

                if (createdValidation == null)
                {
                    return NotFound();
                }

                return CreatedAtRoute("GetValidationById", new { validationId = createdValidation.Id }, createdValidation);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating Validation.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpGet(Name = "GetAllValidations")]
        [Authorize(Roles = "OAS")]
        public async Task<IActionResult> GetAllValidations()
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var validations = await _validationService.GetAllValidationsAsync();

                if (validations.IsNullOrEmpty())
                {
                    return NotFound("There are no validations yet.");
                }

                return Ok(validations);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting list of Validations.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpGet("{validationId}", Name = "GetValidationById")]
        [Authorize(Roles = "OAS")]
        public async Task<IActionResult> GetValidationById(int validationId)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var validation = await _validationService.GetValidationByIdAsync(validationId);

                if (validation == null)
                {
                    return NotFound($"There is no validation {validationId} yet.");
                }

                return Ok(validation);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting list of Validations.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpPut(Name = "UpdateValidation")]
        [Authorize(Roles = "OAS, NAS")]
        public async Task<IActionResult> UpdateValidation(ValidationUpdateDto validationUpdate, int validationId)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var validation = await _validationService.UpdateValidationAsync(validationUpdate, validationId);

                if (validation == null)
                {
                    return NotFound($"There is no validation {validationId} yet.");
                }

                return Ok(validation);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting list of Validations.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }
    }
}
