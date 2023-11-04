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
                var oas = await _oasService.GetOASAsync(oasId);

                if (oas == null)
                {
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

        [HttpGet("{username}/id", Name = "GetOASId")]
        [Authorize]
        public async Task<IActionResult> GetOASIdAsync(string username)
        {
            try
            {
                var oasId = await _oasService.GetOASIdByUsernameAsync(username);

                if (oasId == 0)
                {
                    return NotFound("OAS does not exist.");
                }

                return Ok(oasId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting OAS Id");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");

            }
        }

        [HttpGet(Name = "GetAllOAS")]
        [Authorize]
        public async Task<IActionResult> GetAllOAS()
        {
            try
            {
                var oas = await _oasService.GetAllOASAsync();

                if (oas == null)
                {
                    return NotFound("There is no registered OAS.");
                }

                return Ok(oas);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting list of OAS.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }
    }
}
