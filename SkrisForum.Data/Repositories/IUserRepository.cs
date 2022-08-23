using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkrisForum.Data.Repositories
{
    public interface IUserRepository<User> : IRepository<User>
    {
        Task<User> GetByUsername(string username);
    }
}
