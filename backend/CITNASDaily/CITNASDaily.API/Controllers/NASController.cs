using CITNASDaily.Entities.Dtos.NASDto;
using CITNASDaily.Entities.Models;
using CITNASDaily.Services.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace CITNASDaily.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class NASController : ControllerBase
	{
		private readonly INASService _nasService;
		private readonly ILogger<NASController> _logger;

		public NASController (INASService nasService, ILogger<NASController> logger)
		{
			_nasService = nasService;
			_logger = logger;
		}

		[HttpPost]
		public async Task<IActionResult> CreateNAS (NASCreationDto nasDto)
		{
			try
			{
				var nas = await _nasService.CreateNAS (nasDto);
				if (nas == 0) return BadRequest();
				return Ok(nas);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "Error encountered when creating NAS.");
				return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
			}
		}

		[HttpGet("office/{officeId}")]
		public async Task<IActionResult> GetAllNASByOfficeId (int officeId)
		{
			try
			{
				var nas = await _nasService.GetAllNASByOfficeId(officeId);
				if (nas.IsNullOrEmpty()) return NoContent();
				return Ok(nas);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "Error getting NAS.");
				return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
			}
		}
	}
}
