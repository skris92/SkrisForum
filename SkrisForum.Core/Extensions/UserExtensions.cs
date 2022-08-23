using SkrisForum.Core.Model.UserDTOs;
using SkrisForum.Data.Entities;

namespace SkrisForum.Core.Extensions
{
    public static class UserExtensions
    {
        public static UserViewDTO ToUserViewDTO(this User user)
        {
            return new UserViewDTO
            {
                Id = user.Id,
                Email = user.Email,
                Username = user.Username,
                Role = user.Role.ToString()
            };
        }

        public static UserLoginDTO ToUserLoginDTO(this User user)
        {
            return new UserLoginDTO
            {
                Id = user.Id,
                Username = user.Username,
                HashedPassword = user.HashedPassword,
                Role = user.Role
            };
        }
    }
}
