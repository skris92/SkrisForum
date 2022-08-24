using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using SkrisForum.Core.Model.AuthenticationModels.Responses;
using SkrisForum.Core.Model.UserDTOs;
using SkrisForum.Services;
using System.IdentityModel.Tokens.Jwt;

namespace SkrisForum.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly JwtSecurityTokenHandler _jwtHandler;

        public UsersController(UserService userService)
        {
            _userService = userService;
            _jwtHandler = new JwtSecurityTokenHandler();
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
                var accessToken = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

                if (CheckPermission(accessToken, userId))
                {
                    var deletedUser = await _userService.DeleteUser(userId);
                    return Ok(deletedUser);
                }
                return BadRequest(new ErrorResponse("Permission denied"));
            }
            catch (Exception e)
            {
                return BadRequest(new ErrorResponse(e.Message));
            }
        }

        private bool CheckPermission(string accessToken, Guid userId)
        {
            var token = (JwtSecurityToken)_jwtHandler.ReadToken(accessToken);
            var requesterId = token.Claims.Single(claim => claim.Type == "id").Value;
            var requesterRole = token.Claims.Single(claim => claim.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role").Value;

            return requesterRole == "ADMIN" || userId.ToString() == requesterId;
        }
    }
}
