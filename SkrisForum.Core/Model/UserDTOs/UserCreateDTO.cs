using System.ComponentModel.DataAnnotations;

namespace SkrisForum.Core.Model.UserDTOs
{
    public class UserCreateDTO
    {
        [Required]
        [MaxLength(20), MinLength(2)]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(50)]
        public string EmailAddress { get; set; }

        [Required]
        [MaxLength(20), MinLength(4)]
        public string Password { get; set; }

        public string? Role { get; set; }
    }
}
