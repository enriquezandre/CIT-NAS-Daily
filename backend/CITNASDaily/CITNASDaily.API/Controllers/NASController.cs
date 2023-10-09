using CITNASDaily.Entities.Dtos.NASDtos;
using CITNASDaily.Entities.Dtos.SuperiorDtos;
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
    public class NASController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly INASService _nasService;
        private readonly ILogger<NASController> _logger;

        public NASController(IAuthService authService, INASService nasService, ILogger<NASController> logger)
        {
            _authService = authService;
            _nasService = nasService;
            _logger = logger;
        }

        [HttpGet("{nasId}", Name = "GetNAS")]
        [Authorize]
        public async Task<IActionResult> GetNAS(int nasId)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null) return Forbid();

                // Pass the username from the API request
                var nas = await _nasService.GetNASAsync(currentUser.Username, nasId);

                if (nas == null)
                {
                    // Handle the case where the superior with the given username or ID does not exist.
                    // You can return an appropriate response or throw an exception.
                    // For example:
                    return NotFound("NAS not found");
                }

                return Ok(nas);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting Superior.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType(typeof(NASDto), StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateNAS([FromBody] NASCreateDto nasCreate)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var createdNas = await _nasService.CreateNASAsync(nasCreate.Username, nasCreate);

                if (createdNas == null)
                {
                    return NotFound();
                }

                return CreatedAtRoute("GetNAS", new { nasId = createdNas.Id }, createdNas);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating NAS.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }
    }
}
