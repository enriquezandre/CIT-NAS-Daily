﻿using CITNASDaily.Entities.Dtos.OfficeDtos;
using CITNASDaily.Entities.Dtos.SuperiorDtos;
using CITNASDaily.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CITNASDaily.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfficesController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IOfficeService _officeService;
        private readonly ILogger<OfficesController> _logger;

        public OfficesController(IAuthService authService, IOfficeService officeService, ILogger<OfficesController> logger)
        {
            _authService = authService;
            _officeService = officeService;
            _logger = logger;
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType(typeof(OfficeDto), StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateSuperior([FromBody] OfficeCreateDto officeCreate)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var createdOffice = await _officeService.CreateOfficeAsync(officeCreate);

                if (createdOffice == null)
                {
                    return NotFound();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating Office.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetOffices()
        {
            try
            {
                var offices = await _officeService.GetOfficesAsync();
                if (offices == null) return BadRequest();
                return Ok(offices);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error encountered when retrieving all Offices.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }
    }
}