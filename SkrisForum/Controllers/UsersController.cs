using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
        private readonly UserService _userService;

        public UsersController(UserService userService)
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
            catch (Exception)
            {
                return BadRequest(new ErrorResponse("Non-existing user"));
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
    }
}
