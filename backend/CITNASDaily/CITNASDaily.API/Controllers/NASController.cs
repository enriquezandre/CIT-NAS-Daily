using CITNASDaily.Entities.Dtos.NASDtos;
using CITNASDaily.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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

        #region CreateNAS

        [HttpPost]
        [Authorize(Roles = "OAS")]
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

        #endregion


        #region GetNAS

        [HttpGet("{nasId}", Name = "GetNAS")]
        [Authorize(Roles = "OAS, NAS, Superior")]
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
                _logger.LogError(ex, "Error getting NAS.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpGet("{nasId}/noimg", Name = "GetNASNoImage")]
        [Authorize(Roles = "OAS, NAS, Superior")]
        public async Task<IActionResult> GetNASNoImage(int nasId)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null) return Forbid();

                // Pass the username from the API request
                var nas = await _nasService.GetNASNoImageAsync(nasId);

                if (nas == null)
                {
                    return NotFound("NAS not found");
                }

                return Ok(nas);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting NAS.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpGet(Name = "GetAllNAS")]
        [Authorize(Roles = "OAS")]
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

        [HttpGet("noimg", Name = "GetAllNASNoImage")]
        [Authorize(Roles = "OAS, Superior")]
        public async Task<IActionResult> GetAllNASNoImage()
        {
            try
            {
                var nas = await _nasService.GetAllNASNoImageAsync();

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

        [HttpGet("{year}/{semester}/noimg", Name = "GetAllNASBySYSemester")]
        [Authorize(Roles = "OAS")]
        public async Task<IActionResult> GetAllNASBySYSemester(int year, int semester)
        {
            try
            {
                var nas = await _nasService.GetAllNasBySYSemesterAsync(year, (Semester) semester);

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

        [HttpGet("{username}/id", Name = "GetNASId")]
        [Authorize(Roles = "OAS, NAS")]
        public async Task<IActionResult> GetNASIdAsync(string username)
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

        [HttpGet("{officeId}/{year}/{semester}", Name = "GetNASByOfficeIdSYSemester")]
        [Authorize(Roles = "OAS, Superior")]
        public async Task<IActionResult> GetNASByOfficeIdSYSemester(int officeId, int year, int semester)
        {
            try
            {
                var nas = await _nasService.GetNASByOfficeIdSYSemesterAsync(officeId, year, (Semester)semester);

                if (nas == null)
                {
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
        [Authorize(Roles = "OAS, NAS, Superior")]
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

        [HttpGet("sysem", Name = "GetAllSYAndSem")]
        [Authorize(Roles = "OAS, NAS, Superior")]
        public async Task<IActionResult> GetAllSYAndSem()
        {
            try
            {
                var sysem = await _nasService.GetAllSYAndSem();

                if (sysem == null)
                {
                    return NotFound("No school year and sem.");
                }

                return Ok(sysem);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting school year and sem");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpGet("{nasId}/{year}/{semester}/noimg", Name = "GetNASByNASIdSYSemesterNoImg")]
        [Authorize(Roles = "OAS, NAS, Superior")]
        public async Task<IActionResult> GetNASByNASIdSYSemesterNoImg(int nasId, int year, int semester)
        {
            try
            {
                var nas = await _nasService.GetNASByNASIdSYSemesterNoImgAsync(nasId, year, (Semester)semester);

                if(nas == null)
                {
                    return NotFound($"NAS #{nasId} is not enrolled for the specified semester of the school year {year}");
                }

                return Ok(nas);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting NAS");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        #endregion

        #region UpdateUpload

        [HttpPut("grades/{nasId}/{year}/{semester}", Name = "UploadGrades")]
        [Authorize(Roles = "OAS, NAS")]
        public async Task<IActionResult> UploadGrades(int nasId, int year, int semester, [FromForm] IFormFile file)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }

                var nasGrades = await _summaryEvaluationService.UploadGrades(nasId, year, (Semester)semester, file);

                if (nasGrades == null)
                {
                    return BadRequest("Upload Failed");
                }

                return Ok(new { Grade = nasGrades.AcademicPerformance });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading grades.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpPut("photo/{nasId}", Name = "UploadPhoto")]
        [Authorize(Roles = "OAS, NAS")]
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
                    return BadRequest("Upload Failed");
                }

                return Ok(new { Image = result });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading photo.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        [HttpPut("{nasId}", Name = "UpdateNAS")]
        [Authorize(Roles = "OAS")]
        public async Task<IActionResult> UpdateNAS(int nasId, [FromBody] NASUpdateDto nasUpdate)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null)
                {
                    return Forbid();
                }
                var nas = await _nasService.UpdateNASAsync(nasId, nasUpdate);
                if (nas == null)
                {
                    return BadRequest("Failed to Update NAS");
                }
                return Ok(nas);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating nas.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        #endregion
    }
}
