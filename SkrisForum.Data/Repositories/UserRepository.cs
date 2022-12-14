using Microsoft.EntityFrameworkCore;
using SkrisForum.Data.Entities;

namespace SkrisForum.Data.Repositories
{
    public class UserRepository : IUserRepository<User>
    {
        private readonly SkrisForumDBContext _dbContext;

        public UserRepository(SkrisForumDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task Add(User entity)
        {
            await _dbContext.Users.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(User user)
        {
            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<User>> GetAll()
        {
            return await _dbContext.Users.ToListAsync();
        }

        public async Task<User> GetById(Guid id)
        {
            return await _dbContext.Users.SingleAsync(user => user.Id == id);
        }

        public async Task<User> GetByUsername(string username)
        {
            return await _dbContext.Users.SingleAsync(user => user.Username == username);
        }

        public async Task Update(User entity)
        {
            var userToUpdate = await GetById(entity.Id);
            userToUpdate = entity;
            await _dbContext.SaveChangesAsync();
        }
    }
}
