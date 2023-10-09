using CITNASDaily.Entities.Dtos.OASDtos;
using CITNASDaily.Entities.Dtos.SuperiorDtos;
using CITNASDaily.Services.Contracts;
using CITNASDaily.Services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CITNASDaily.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OASController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IOASService _oasService;
        private readonly ILogger<OASController> _logger;

        public OASController(IAuthService authService, IOASService oasService, ILogger<OASController> logger)
        {
            _authService = authService;
            _oasService = oasService;
            _logger = logger;
        }
        [HttpPost]
        [Authorize]
        [ProducesResponseType(typeof(OASDto), StatusCodes.Status201Created)]
        public async Task<IActionResult> OASCreate([FromBody] OASCreateDto oasCreate)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var createdOAS = await _oasService.CreateOASAsync(oasCreate.Username, oasCreate);

                if (createdOAS == null)
                {
                    return NotFound();
                }

                return CreatedAtRoute("GetOAS", new { oasId = createdOAS.Id }, createdOAS);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating OAS.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpGet("{oasId}", Name = "GetOAS")]
        [Authorize]
        public async Task<IActionResult> GetOAS(int oasId)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null) return Forbid();

                // Pass the username from the API request
                var oas = await _oasService.GetOASAsync(currentUser.Username, oasId);

                if (oas == null)
                {
                    // Handle the case where the superior with the given username or ID does not exist.
                    // You can return an appropriate response or throw an exception.
                    // For example:
                    return NotFound();
                }

                return Ok(oas);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting OAS.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }
    }
}
