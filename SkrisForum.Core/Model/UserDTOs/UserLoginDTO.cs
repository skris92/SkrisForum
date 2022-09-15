using SkrisForum.Data.Entities;

namespace SkrisForum.Core.Model.UserDTOs
{
    public class UserLoginDTO
    {
        public Guid Id { get; set; }
        public string EmailAddress { get; set; }
        public string Username { get; set; }
        public string HashedPassword { get; set; }
        public UserRole Role { get; set; }
    }
}
