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

		[HttpPost]
		public async Task<IActionResult> CreateOffice(OfficeCreationDto officeDto)
		{
			try
			{
				var office = await _officeService.CreateOffice(officeDto);
				if (office == 0) return BadRequest();
				return Ok(office);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, "Error encountered when creating Office.");
				return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
			}
		}
	}
}
