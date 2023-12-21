using CITNASDaily.Entities.Dtos.ValidationDtos;
using CITNASDaily.Entities.Models;
using CITNASDaily.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace CITNASDaily.API.Controllers
{
    /// <summary>
    /// Controller for managing validations.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ValidationController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IValidationService _validationService;
        private readonly ILogger<ValidationController> _logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="ValidationController"/> class.
        /// </summary>
        /// <param name="authService">The authentication service.</param>
        /// <param name="validationService">The validation service.</param>
        /// <param name="logger">The logger.</param>
        public ValidationController(IAuthService authService, IValidationService validationService, ILogger<ValidationController> logger)
        {
            _authService = authService;
            _validationService = validationService;
            _logger = logger;
        }

        #region CreateValidation

        /// <summary>
        /// Creates a new validation entry.
        /// </summary>
        /// <param name="validationCreate">The information to create a validation entry.</param>
        /// <returns>Newly created validation entry.</returns>
        /// <remarks>
        /// Sample request:
        /// 
        ///     POST /api/Validation
        ///     {
        ///         "nasId": 1,
        ///         "nasLetter": "",
        ///         "absenceDate": "2023-12-21T12:00:00.000Z",
        ///         "semester": 0,
        ///         "schoolYear": 2324
        ///     }
        /// 
        /// </remarks>
        /// <response code="201">Successfully created validation</response>
        /// <response code="400">Invalid validation</response>
        /// <response code="403">Invalid user role</response>
        /// <response code="500">Internal server error</response>
        [HttpPost]
        [Authorize(Roles = "OAS, NAS")]
        [ProducesResponseType(typeof(Validation), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
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
                    return BadRequest($"Validation creation of NAS id #{validationCreate.NasId} failed.");
                }

                return CreatedAtRoute("GetValidationById", new { validationId = createdValidation.Id }, createdValidation);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating Validation.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        #endregion

        #region GetValidation

        /// <summary>
        /// Retrieves all validation entries.
        /// </summary>
        /// <returns>List of all validation entries.</returns>
        /// <remarks>
        /// Sample request:
        /// 
        ///     GET /api/Validation
        /// 
        /// </remarks>
        /// <response code="200">Successfully retrieved Validation</response>
        /// <response code="403">Invalid user role</response>
        /// <response code="404">No Validation found</response>
        /// <response code="500">Internal server error</response>
        [HttpGet(Name = "GetAllValidations")]
        [Authorize(Roles = "OAS")]
        [ProducesResponseType(typeof(IEnumerable<Validation>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
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
                    return NotFound("No validations found.");
                }

                return Ok(validations);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to retrieve validations.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }


        /// <summary>
        /// Retrieves validation entry by id.
        /// </summary>
        /// <param name="validationId">Unique identifier of the validation entry.</param>
        /// <returns>Requested validation entry.</returns>
        /// <remarks>
        /// Sample request:
        /// 
        ///     GET /api/Validation/1
        /// 
        /// </remarks>
        /// <response code="200">Successfully retrieved Validation</response>
        /// <response code="403">Invalid user role</response>
        /// <response code="404">No Validation found</response>
        /// <response code="500">Internal server error</response>
        [HttpGet("{validationId}", Name = "GetValidationById")]
        [Authorize(Roles = "OAS, NAS")]
        [ProducesResponseType(typeof(ValidationDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
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
                    return NotFound($"Validation #{validationId} does not exist.");
                }

                return Ok(validation);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to retrieve validation.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        /// <summary>
        /// Retrieves a list of validation entries by NAS id.
        /// </summary>
        /// <param name="nasId">NAS unique identifier.</param>
        /// <returns>List of all validation entries by NAS id.</returns>
        /// <remarks>
        /// Sample request:
        /// 
        ///     GET /api/Validation/nas/1
        /// 
        /// </remarks>
        /// <response code="200">Successfully retrieved Validation</response>
        /// <response code="403">Invalid user role</response>
        /// <response code="404">No Validation found</response>
        /// <response code="500">Internal server error</response>
        [HttpGet("nas/{nasId}", Name = "GetValidationByNasId")]
        [Authorize(Roles = "OAS, NAS")]
        [ProducesResponseType(typeof(IEnumerable<Validation>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetValidationByNasId(int nasId)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var validation = await _validationService.GetValidationByNasIdAsync(nasId);

                if (validation.IsNullOrEmpty())
                {
                    return NotFound($"No validation found for NAS id #{nasId}");
                }

                return Ok(validation);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to retrieve list of validations.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        #endregion

        #region UpdateValidation

        /// <summary>
        /// Updates validation entry based on the specified id. 
        /// </summary>
        /// <param name="validationUpdate">New Validation information.</param>
        /// <param name="validationId">Unique identifier of the validation.</param>
        /// <returns>Newly updated validation entry.</returns>
        /// <remarks>
        /// Sample request:
        /// 
        ///     PUT /api/Validation/1
        ///     {
        ///         "validationStatus": 1,
        ///         "makeUpHours": 4
        ///     }
        /// 
        /// </remarks>
        /// <response code="200">Successfully retrieved Validation</response>
        /// <response code="403">Invalid user role</response>
        /// <response code="404">No Validation found</response>
        /// <response code="500">Internal server error</response>
        [HttpPut(Name = "UpdateValidation")]
        [Authorize(Roles = "OAS, NAS")]
        [ProducesResponseType(typeof(Validation), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
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
                    return NotFound($"Validation #{validationId} does not exist.");
                }

                return Ok(validation);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to update validation.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        #endregion
    }
}
