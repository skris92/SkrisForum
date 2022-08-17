using Microsoft.EntityFrameworkCore;
using SkrisForum.Data.Entities;

namespace SkrisForum.Data
{
    public class SkrisForumDBContext : DbContext
    {
        public SkrisForumDBContext(DbContextOptions<SkrisForumDBContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasIndex(user => user.Email).IsUnique();
            modelBuilder.Entity<User>().HasIndex(user => user.Username).IsUnique();
        }
    }
}
