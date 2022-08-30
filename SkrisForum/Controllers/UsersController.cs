using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkrisForum.Core.Model.AuthenticationModels.Responses;
using SkrisForum.Core.Model.UserDTOs;
using SkrisForum.Services;

namespace SkrisForum.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize(Roles = "ADMIN, USER")]
        [HttpGet]
        public async Task<ActionResult<List<UserViewDTO>>> GetAllUsers()
        {
            return await _userService.GetAllUsers();
        }

        [Authorize(Roles = "ADMIN, USER")]
        [HttpGet("{userId}", Name = "GetUserById")]
        public async Task<ActionResult<UserViewDTO>> GetUserById(Guid userId)
        {
            try
            {
                return await _userService.GetUserById(userId);
            }
            catch (Exception e)
            {
                return BadRequest(new ErrorResponse(e.Message));
            }
        }

        [HttpPost]
        public async Task<ActionResult<UserViewDTO>> AddUser(UserCreateDTO newUser)
        {
            try
            {
                var createdUser = await _userService.AddUser(newUser);
                return CreatedAtRoute("GetUserById", new {userId = createdUser.Id}, createdUser);
            }
            catch (DbUpdateException e)
            {
                return BadRequest(new ErrorResponse(e.Message));
            }
        }

        [Authorize(Roles = "ADMIN, USER")]
        [HttpDelete("{userId}", Name = "DeleteUser")]
        public async Task<ActionResult<UserViewDTO>> DeleteUser(Guid userId)
        {
            try
            {
                if (User.IsInRole("ADMIN") || CheckUserIfSameAsRequester(userId))
                {
                    var deletedUser = await _userService.DeleteUser(userId);
                    return Ok(deletedUser);
                }
                return Unauthorized(new ErrorResponse("Permission denied"));
            }
            catch (Exception e)
            {
                return BadRequest(new ErrorResponse(e.Message));
            }
        }

        [Authorize(Roles = "ADMIN, USER")]
        [HttpPatch("{userId}", Name = "UpdateUser")]
        public async Task<ActionResult<UserViewDTO>> UpdateUser(Guid userId, [FromBody] UserUpdateDTO updateDto)
        {
            try
            {
                if (User.IsInRole("ADMIN") || CheckUserIfSameAsRequester(userId))
                {
                    var updatedUser = await _userService.UpdateUser(userId, updateDto);
                    return Ok(updatedUser);
                }
                return Unauthorized(new ErrorResponse("Permission denied"));
            }
            catch (Exception e)
            {
                return BadRequest(new ErrorResponse(e.Message));
            }
        }

        private bool CheckUserIfSameAsRequester(Guid userId)
        {
            var requesterId = User.Claims.Single(claim => claim.Type == "id").Value;

            return userId.ToString() == requesterId;
        }
    }
}
