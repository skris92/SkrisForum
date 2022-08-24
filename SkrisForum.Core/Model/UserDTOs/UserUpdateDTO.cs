using System.ComponentModel.DataAnnotations;

namespace SkrisForum.Core.Model.UserDTOs
{
    public class UserUpdateDTO
    {
        public Guid? Id { get; set; }

        public string? EmailAddress { get; set; }

        public string? Username { get; set; }

        public string? Password { get; set; }

        public string? Role { get; set; }
    }
}
