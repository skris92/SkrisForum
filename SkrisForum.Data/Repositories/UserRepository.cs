﻿using Microsoft.EntityFrameworkCore;
using SkrisForum.Data.Entities;

namespace SkrisForum.Data.Repositories
{
    public class UserRepository : IRepository<User>
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

        public async Task Delete(Guid id)
        {
            _dbContext.Users.Remove(await GetById(id));
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<User>> GetAll()
        {
            return await _dbContext.Users.ToListAsync();
        }

        public async Task<User?> GetById(Guid id)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(user => user.Id == id);
        }

        public async Task<User> Update(User entity)
        {
            var userToUpdate = await _dbContext.Users.SingleAsync(user => user.Id == entity.Id);
            userToUpdate = entity;
            await _dbContext.SaveChangesAsync();
            return userToUpdate;
        }
    }
}