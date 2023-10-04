using CITNASDaily.Entities.Dtos.NASDto;
using CITNASDaily.Entities.Dtos.OfficeDto;
using CITNASDaily.Services.Contracts;
using CITNASDaily.Services.Services;
using Microsoft.AspNetCore.Mvc;

namespace CITNASDaily.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class OfficesController : ControllerBase
	{
		private readonly IOfficeService _officeService;
		private readonly ILogger<OfficesController> _logger;

		public OfficesController(IOfficeService officeService, ILogger<OfficesController> logger)
		{
			_officeService = officeService;
			_logger = logger;
		}

		/// <summary>
		/// this creates an entry for office.
		/// </summary>
		/// <param name="officeDto"></param>
		/// <returns>
		/// returns ok, if creation is succesful
		/// returns badrequest, if nas is null
		/// </returns>

		[HttpPost]
		public async Task<IActionResult> CreateOffice([FromBody] OfficeCreationDto officeDto)
		{
			try
			{
				var office = await _officeService.CreateOffice(officeDto);
				if (office == null) return BadRequest();
				return Ok(office);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "Error encountered when creating Office.");
				return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
			}
		}

		/// <summary>
		/// this gets all the offices.
		/// </summary>
		/// <returns></returns>
		[HttpGet]
		public async Task<IActionResult> GetAllOffices()
		{
			try
			{
				var offices = await _officeService.GetAllOffices();
				if (offices == null) return BadRequest();
				return Ok(offices);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "Error encountered when retrieving all Offices.");
				return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
			}
		}

		/// <summary>
		/// this gets an office by it's id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpGet]
		public async Task<IActionResult> GetOfficeById(int id)
		{
			try
			{
				var offices = await _officeService.GetOfficeById(id);
				if (offices == null) return BadRequest();
				return Ok(offices);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "Error encountered when retrieving Office.");
				return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
			}
		}
	}
}
