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
                Email = user.EmailAddress,
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

        public static User ToUserEntity(this UserCreateDTO user)
        {
            return new User
            {
                EmailAddress = user.EmailAddress,
                Username = user.Username,
                HashedPassword = user.Password,
                Role = (UserRole)Enum.Parse(typeof(UserRole), user.Role)
            };
        }
    }
}
