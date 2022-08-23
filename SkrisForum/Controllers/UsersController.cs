using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    }
}
