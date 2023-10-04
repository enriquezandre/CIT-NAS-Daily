using CITNASDaily.Entities.Dtos.NASDto;
using CITNASDaily.Entities.Dtos.SuperiorDtos;
using CITNASDaily.Entities.Models;
using CITNASDaily.Services.Contracts;
using CITNASDaily.Services.Services;
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

		/// <summary>
		/// this is the controller for creating new entry of nas.
		/// </summary>
		/// <param name="nasDto"></param>
		/// <returns>
		/// returns the route if creation is succesful.
		/// returns badrequest if nas is null.</returns>

		[HttpPost]
		[ProducesResponseType(typeof(NASCreationDto), StatusCodes.Status201Created)]
		public async Task<IActionResult> CreateNAS ([FromBody] NASCreationDto nasDto)
		{
			try
			{
				var nas = await _nasService.CreateNAS(nasDto);
				if (nas == null) return BadRequest();
				return CreatedAtRoute("GetNAS", new { nasId = nas?.Id }, nas);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "Error encountered when creating NAS.");
				return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
			}
			
		}

		/// <summary>
		/// for increment 1 "View NAS assigned"
		/// gets all nas by office id
		/// </summary>
		/// <param name="officeId"></param>
		/// <returns></returns>

		[HttpGet("office/{officeId}")]
		public async Task<IActionResult> GetAllNASByOfficeId (int officeId)
		{
			try
			{
				var nas = await _nasService.GetAllNASByOfficeId(officeId);
				if (nas == null) return NoContent();
				return Ok(nas);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "Error getting NAS.");
				return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
			}
		}

		/// <summary>
		/// this is the controller for updating an existing nas.
		/// </summary>
		/// <param name="nasDto"></param>
		/// <returns>
		/// returns the createdroute, if succesful.
		/// returns badrequest, if nas is null.
		/// </returns>
		[HttpPut]
		public async Task<IActionResult> UpdateNAS([FromBody] NASUpdationDto nasDto)
		{
			try
			{
				var nas = await _nasService.UpdateNAS(nasDto);
				if (nas == null) return BadRequest();
				return CreatedAtRoute("GetNAS", new { nasId = nas?.Id }, nas);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "Error encountered when creating NAS.");
				return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
			}

		}
	}
}
