using CITNASDaily.Entities.Dtos.ScheduleDtos;
using CITNASDaily.Entities.Models;
using CITNASDaily.Services.Contracts;
using CITNASDaily.Services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IScheduleService _scheduleService;
        private readonly ILogger<ScheduleController> _logger;

        public ScheduleController(IAuthService authService, IScheduleService scheduleService, ILogger<ScheduleController> logger)
        {
            _authService = authService;
            _scheduleService = scheduleService;
            _logger = logger;
        }

        [HttpGet("{nasId}", Name = "GetSchedulesByNASId")]
        [Authorize(Roles = "OAS, NAS")]
        public async Task<IActionResult> GetSchedulesByNASId(int nasId)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null) return Forbid();

                var schedule = await _scheduleService.GetSchedulesByNASIdAsync(nasId);

                if (schedule == null)
                {
                    return NotFound("Schedule not found");
                }

                return Ok(schedule);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting Schedule.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpGet("{nasId}/{year}/{semester}", Name = "GetSchedulesByNASIdSYSemester")]
        [Authorize(Roles = "OAS, NAS")]
        public async Task<IActionResult> GetSchedulesByNASIdSYSemester(int nasId, int year, int semester)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null) return Forbid();

                var schedule = await _scheduleService.GetSchedulesByNASIdSYSemesterAsync(nasId, year, (Semester)semester);

                if (schedule == null)
                {
                    return NotFound("Schedule not found");
                }

                return Ok(schedule);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting Schedule.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpPost]
        [Authorize(Roles = "NAS")]
        [ProducesResponseType(typeof(ScheduleDto), StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateNASSchedule([FromBody] ScheduleCreateDto scheduleCreate)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var createdSchedule = await _scheduleService.CreateScheduleAsync(scheduleCreate);

                if (createdSchedule == null)
                {
                    return BadRequest("Creation Failed");
                }

                return CreatedAtRoute("GetSchedulesByNASId", new { nasId = createdSchedule.NASId }, createdSchedule);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating Schedule.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpDelete]
        [Authorize(Roles = "OAS")]
        public async Task<IActionResult> DeleteScheduleByNASIdAsync(int nasId)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);

                if (currentUser == null)
                {
                    return Forbid();
                }

                var checkSched = await _scheduleService.GetSchedulesByNASIdAsync(nasId);

                if(checkSched == null)
                {
                    return NotFound($"Schedule with NAS Id {nasId} does not exist");
                }

                await _scheduleService.DeleteSchedulesByNASIdAsync(nasId);
                return Ok($"Schedules with NAS Id {nasId} deleted successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting NAS Schedule.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }
    }
}
