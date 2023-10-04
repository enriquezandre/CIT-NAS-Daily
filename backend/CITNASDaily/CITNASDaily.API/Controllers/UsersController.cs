﻿using CITNASDaily.Entities.Dtos.UserDtos;
using CITNASDaily.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace CITNASDaily.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAuthService _authService;
        private readonly ILogger<UsersController> _logger;

        public UsersController(IUserService userService, IAuthService authService, ILogger<UsersController> logger)
        {
            _userService = userService;
            _authService = authService;
            _logger = logger;
        }
        /// <summary>
        /// gets all users
        /// </summary>
        /// <returns>list of users</returns>
        /// <reponse code="200">Returns a list of users</reponse>
        /// <reponse code="204">No users found</reponse>
        /// <reponse code="500">Internal server error</reponse>
        [HttpGet]
        [AllowAnonymous]
        [Produces("application/json")]
        [ProducesResponseType(typeof(IEnumerable<UserDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            try
            {
                var users = await _userService.GetUsersAsync();
                if (users.IsNullOrEmpty()) return NoContent();

                return Ok(users);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting users.");

                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }
        /// <summary>
        /// Gets a user by <paramref name="userId"/>
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>one user</returns>
        /// <reponse code="200">Returns a user</reponse>
        /// <reponse code="404">User not found</reponse>
        /// <reponse code="401">Unauthorized</reponse>
        /// <reponse code="403">Forbidden</reponse>
        /// <reponse code="500">Internal server error</reponse>
        [HttpGet("{userId}", Name = "GetUser")]
        [Authorize]
        [Produces("application/json")]
        [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<UserDto>> GetUser(Guid userId)
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null) return Forbid();
                if (currentUser.Id != userId) return Forbid();

                var user = await _userService.GetUserByIdAsync(userId);
                if (user == null) return NotFound();

                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user.");

                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }
        /// <summary>
        /// gets current user
        /// </summary>
        /// <returns></returns>
        [HttpGet("currentUser")]
        [Authorize]
        [Produces("application/json")]
        [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<UserDto> GetCurrentUser()
        {
            try
            {
                var currentUser = _authService.GetCurrentUser(HttpContext.User.Identity as ClaimsIdentity);
                if (currentUser == null) return Forbid();

                return Ok(currentUser);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting current user.");

                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }
        [HttpGet("checkUsername")]
        [AllowAnonymous]
        [Produces("application/json")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<bool>> CheckUsername(string username)
        {
            try
            {
                var result = await _userService.DoesUsernameExist(username);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking username.");

                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

    }
}
