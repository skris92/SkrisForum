using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkrisForum.Core.Model.AuthenticationModels.Requests;
using SkrisForum.Core.Model.AuthenticationModels.Responses;
using SkrisForum.Core.Model.UserDTOs;
using SkrisForum.Services;
using SkrisForum.Services.Authenticators;

namespace SkrisForum.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly Authenticator _authenticator;

        public AuthenticationController(UserService userService, Authenticator authenticator)
        {
            _userService = userService;
            _authenticator = authenticator;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<string> errorMessages = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));

                return BadRequest(new ErrorResponse(errorMessages));
            }

            UserLoginDTO user = new UserLoginDTO();

            try
            {
                user = await _userService.GetLoginDTOByUsername(loginRequest.Username);
            }
            catch (Exception)
            {
                return BadRequest(new ErrorResponse("Invalid credentials"));
            }

            bool isCorrectPassword = BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.HashedPassword);

            if (!isCorrectPassword)
            {
                return BadRequest(new ErrorResponse("Invalid credentials"));
            }

            AuthenticatedUserResponse response = _authenticator.Authenticate(user);

            return Ok(response);
        }
    }
}
