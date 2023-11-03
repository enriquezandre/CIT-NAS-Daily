﻿using CITNASDaily.Entities.Dtos.ScheduleDtos;
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

        [HttpGet("{nasId}", Name = "GetSchedule")]
        [Authorize]
        public async Task<IActionResult> GetSchedule(int nasId)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null) return Forbid();

                var schedule = await _scheduleService.GetScheduleAsync(nasId);

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
        [Authorize]
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
                    return NotFound();
                }

                return Ok(createdSchedule);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating Schedule.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpPut]
        [Authorize]

        public async Task<IActionResult> UpdateNASSchedule([FromBody] ScheduleUpdateDto schedule)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var checkSchedule = await _scheduleService.GetScheduleAsync(schedule.NASId);

                if (checkSchedule == null)
                {
                    return NotFound();
                }

                await _scheduleService.UpdateScheduleAsync(schedule);

                return Ok("Schedule Updated");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating Schedule.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }
    }
}