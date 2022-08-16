using System.ComponentModel.DataAnnotations;

namespace SkrisForum.Data.Entity
{
    public class User
    {
        public Guid Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MaxLength(20)]
        public string Username { get; set; }

        [Required]
        public string HashedPassword { get; set; }

        [Required]
        public UserRole Role { get; set; }
    }
}
