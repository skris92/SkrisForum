using SkrisForum.Core.Extensions;
using SkrisForum.Core.Model.UserDTOs;
using SkrisForum.Data.Entities;
using SkrisForum.Data.Repositories;

namespace SkrisForum.Services
{
    public class UserService
    {
        private readonly IRepository<User> _userRepository;

        public UserService(IRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<List<UserViewDTO>> GetAllUsers()
        {
            return (await _userRepository.GetAll()).Select(user => user.ToUserViewDTO()).ToList();
        }
    }
}
