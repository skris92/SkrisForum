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
                Username = user.Username
            };
        }
    }
}
