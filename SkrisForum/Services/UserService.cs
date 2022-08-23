using SkrisForum.Core.Extensions;
using SkrisForum.Core.Model.UserDTOs;
using SkrisForum.Data.Entities;
using SkrisForum.Data.Repositories;

namespace SkrisForum.Services
{
    public class UserService
    {
        private readonly IUserRepository<User> _userRepository;

        public UserService(IUserRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<List<UserViewDTO>> GetAllUsers()
        {
            return (await _userRepository.GetAll()).Select(user => user.ToUserViewDTO()).ToList();
        }

        public async Task<UserLoginDTO> GetLoginDTOByUsername(string username)
        {
            var user = await _userRepository.GetByUsername(username);

            return user.ToUserLoginDTO();
        }
    }
}
