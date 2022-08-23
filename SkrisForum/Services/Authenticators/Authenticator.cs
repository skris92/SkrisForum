using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SkrisForum.Core.Model.AuthenticationModels;
using SkrisForum.Core.Model.AuthenticationModels.Responses;
using SkrisForum.Core.Model.UserDTOs;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SkrisForum.Services.Authenticators
{
    public class Authenticator
    {
        private readonly AuthenticationConfiguration _configuration;

        public Authenticator(IOptions<AuthenticationConfiguration> configuration)
        {
            _configuration = configuration.Value;
        }

        public string GenerateToken(string secretKey, string issuer, string audience, double expirationMinutes,
            IEnumerable<Claim> claims = null)
        {
            SecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);


            JwtSecurityToken token = new JwtSecurityToken(
                issuer,
                audience,
                claims,
                DateTime.UtcNow,
                DateTime.UtcNow.AddMinutes(expirationMinutes),
                credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string GenerateAccessToken(UserLoginDTO user)
        {
            List<Claim> claims = new List<Claim>()
        {
            new Claim("id", user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role.ToString())        };

            return GenerateToken(
                _configuration.AccessTokenSecret,
                _configuration.Issuer,
                _configuration.Audience,
                _configuration.AccessTokenExpirationMinutes,
                claims);
        }

        public AuthenticatedUserResponse Authenticate(UserLoginDTO user)
        {
            string accessToken = GenerateAccessToken(user);

            return new AuthenticatedUserResponse()
            {
                AccessToken = accessToken
            };
        }
    }
}
