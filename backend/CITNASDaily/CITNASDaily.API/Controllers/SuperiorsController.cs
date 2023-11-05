using CITNASDaily.Entities.Dtos.SuperiorDtos;
using CITNASDaily.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace CITNASDaily.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuperiorsController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ISuperiorService _superiorService;
        private readonly ILogger<SuperiorsController> _logger;

        public SuperiorsController(IAuthService authService, ISuperiorService superiorService, ILogger<SuperiorsController> logger)
        {
            _authService = authService;
            _superiorService = superiorService;
            _logger = logger;
        }

        [HttpGet("{superiorId}", Name = "GetSuperior")]
        [Authorize]
        public async Task<IActionResult> GetSuperior(int superiorId)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null) return Forbid();

                // Pass the username from the API request
                var superior = await _superiorService.GetSuperiorAsync(superiorId);

                if (superior == null)
                {
                    // Handle the case where the superior with the given username or ID does not exist.
                    // You can return an appropriate response or throw an exception.
                    // For example:
                    return NotFound("Superior not found");
                }

                return Ok(superior);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting Superior.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }


        [HttpPost]
        [Authorize]
        [ProducesResponseType(typeof(SuperiorDto), StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateSuperior([FromBody] SuperiorCreateDto superiorCreate)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var createdSuperior = await _superiorService.CreateSuperiorAsync(superiorCreate.Username, superiorCreate);

                if (createdSuperior == null)
                {
                    return NotFound();
                }

                return CreatedAtRoute("GetSuperior", new { superiorId = createdSuperior.Id }, createdSuperior);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating Superior.");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetSuperiors()
        {
            try
            {
                var superiors = await _superiorService.GetSuperiorsAsync();
                if (superiors.IsNullOrEmpty()) return NoContent();

                return Ok(superiors);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting superiors.");

                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpGet("{officeId}/office", Name = "GetSuperiorByOfficeId")]
        [Authorize]
        public async Task<IActionResult> GetSuperiorByOfficeId(int officeId)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null) return Forbid();

                // Pass the username from the API request
                var superior = await _superiorService.GetSuperiorAsync(officeId);

                if (superior == null)
                {
                    // Handle the case where the superior with the given username or ID does not exist.
                    // You can return an appropriate response or throw an exception.
                    // For example:
                    return NotFound("Superior not found");
                }

                return Ok(superior);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting Superior.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

    }
}
