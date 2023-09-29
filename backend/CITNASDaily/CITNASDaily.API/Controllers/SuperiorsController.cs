using CITNASDaily.Entities.Dtos.SuperiorDtos;
using CITNASDaily.Services.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace CITNASDaily.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuperiorsController : ControllerBase
    {
        private readonly ISuperiorService _superiorService;
        private readonly ILogger<SuperiorsController> _logger;

        public SuperiorsController(ISuperiorService superiorService, ILogger<SuperiorsController> logger)
        {
            _superiorService = superiorService;
            _logger = logger;
        }

        //[HttpGet]
        //public async Task<IActionResult> GetSuperior(int superiorId)
        //{
        //    try
        //    {
        //        var superior = await _superiorService.GetSuperiorAsync(superiorId);
        //        if (superior == null) return NotFound();

        //        return Ok(superior);
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, "Error getting superior.");

        //        return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
        //    }
        //}

        [HttpPost]
        public async Task<IActionResult> CreateSuperior([FromBody] SuperiorCreateDto superiorCreate)
        {
            try
            {
                var createdSuperior = await _superiorService.CreateSuperiorsAsync(superiorCreate);

                return CreatedAtRoute("GetSuperior", new { createdSuperior });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating superior.");

                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }
        [HttpGet]
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
    }
}
