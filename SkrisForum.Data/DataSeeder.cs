using SkrisForum.Data.Entity;

namespace SkrisForum.Data
{
    public class DataSeeder
    {
        private readonly SkrisForumDBContext _dbContext;

        public DataSeeder(SkrisForumDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Seed()
        {
            _dbContext.Database.EnsureCreated();

            if (!_dbContext.Users.Any())
            {
                var seedUsers = new User[2]
                {
                    new User()
                    {
                        Email = "admin@admin.com",
                        Username = "admin",
                        HashedPassword = BCrypt.Net.BCrypt.HashPassword("1234"),
                        Role = UserRole.ADMIN
                    },
                    new User()
                    {
                        Email = "user@user.com",
                        Username = "user",
                        HashedPassword = BCrypt.Net.BCrypt.HashPassword("1234"),
                        Role = UserRole.USER
                    }
                };

                _dbContext.Users.AddRange(seedUsers);
                _dbContext.SaveChanges();
            }
        }
    }
}
