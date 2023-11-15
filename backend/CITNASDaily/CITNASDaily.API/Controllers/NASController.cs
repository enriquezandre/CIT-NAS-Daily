using CITNASDaily.Entities.Dtos.NASDtos;
using CITNASDaily.Entities.Dtos.SummaryEvaluationDtos;
using CITNASDaily.Entities.Dtos.SuperiorDtos;
using CITNASDaily.Entities.Models;
using CITNASDaily.Services.Contracts;
using CITNASDaily.Services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Security.Claims;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NASController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly INASService _nasService;
        private readonly ISuperiorEvaluationRatingService _superiorEvaluationRatingService;
        private readonly ISummaryEvaluationService _summaryEvaluationService;
        private readonly ILogger<NASController> _logger;

        public NASController(IAuthService authService, INASService nasService, ISuperiorEvaluationRatingService superiorEvaluationRatingService, ISummaryEvaluationService summaryEvaluationService, ILogger<NASController> logger)
        {
            _authService = authService;
            _nasService = nasService;
            _superiorEvaluationRatingService = superiorEvaluationRatingService;
            _summaryEvaluationService = summaryEvaluationService;
            _logger = logger;
        }

        [HttpGet("{nasId}", Name = "GetNAS")]
        [Authorize]
        public async Task<IActionResult> GetNAS(int nasId)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null) return Forbid();

                // Pass the username from the API request
                var nas = await _nasService.GetNASAsync(nasId);

                if (nas == null)
                {
                    return NotFound("NAS not found");
                }

                return Ok(nas);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting Superior.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpGet("{officeId}/offices", Name = "GetNASByOfficeIdAsync")]
        [Authorize]
        public async Task<IActionResult> GetNASByOfficeIdAsync(int officeId)
        {
            try
            {
                var nas = await _nasService.GetNASByOfficeIdAsync(officeId);

                if(nas.IsNullOrEmpty()){
                    return NotFound("No NAS under your office yet.");
                }

                return Ok(nas);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting list of NAS.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpGet("{nasId}/rating", Name = "GetNASSuperiorEvaluationRating")]
        [Authorize]
        public async Task<IActionResult> GetNASSuperiorEvaluationRatingAsync(int nasId, Semester semester, int year)
        {
            try
            {
                var superiorEval = await _superiorEvaluationRatingService.GetSuperiorEvaluationRatingByNASIdAndSemesterAndSchoolYearAsync(nasId, semester, year);

                if (superiorEval == null)
                {
                    return NotFound("No Superior Evaluation Rating Yet.");
                }

                return Ok(superiorEval);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting superior evaluation");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpGet("{username}/id", Name = "GetNASId")]
        [Authorize]
        public async Task<IActionResult> GetNASIdAsync (string username)
        {
            try
            {
                var nasId = await _nasService.GetNASIdByUsernameAsync(username);

                if (nasId == 0)
                {
                    return NotFound("NAS does not exist.");
                }

                return Ok(nasId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting NAS Id");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType(typeof(NASDto), StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateNAS([FromBody] NASCreateDto nasCreate)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var createdNas = await _nasService.CreateNASAsync(nasCreate.Username, nasCreate);

                if (createdNas == null)
                {
                    return NotFound();
                }

                return CreatedAtRoute("GetNAS", new { nasId = createdNas.Id }, createdNas);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating NAS.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpGet(Name = "GetAllNAS")]
        [Authorize]
        public async Task<IActionResult> GetAllNAS()
        {
            try
            {
                var nas = await _nasService.GetAllNASAsync();

                if (nas.IsNullOrEmpty())
                {
                    return NotFound("There is no registered NAS.");
                }

                return Ok(nas);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting list of NAS.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpPut("grades/{nasId}", Name = "UploadGrades")]
        [Authorize]
        public async Task<IActionResult> UploadGrades(SummaryEvaluationGradeUpdateDto summary)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }
                
                var nasGrades = await _summaryEvaluationService.UploadGrades(summary);

                if (nasGrades == null)
                {
                    return BadRequest("Upload Failed");
                }

                return Ok(nasGrades);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading grades.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpPut("photo/{nasId}", Name = "UploadPhoto")]
        [Authorize]
        public async Task<IActionResult> UploadPhoto(int nasId, [FromForm] IFormFile file)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var result = await _nasService.UploadPhotoAsync(nasId, file);

                if(result == null)
                {
                    return BadRequest("Invalid file");
                }

                return Ok(new { Image = result });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading photo.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }
    }
}
