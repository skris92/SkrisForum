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

        public async Task<UserViewDTO> GetUserById(Guid userId)
        {
            User user = await _userRepository.GetById(userId);
            return user.ToUserViewDTO();
        }

        public async Task<UserLoginDTO> GetLoginDTOByUsername(string username)
        {
            var user = await _userRepository.GetByUsername(username);

            return user.ToUserLoginDTO();
        }

        public async Task<UserViewDTO> AddUser(UserCreateDTO newUser)
        {
            newUser.Role = "USER";
            newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);

            var userEntity = newUser.ToUserEntity();
            await _userRepository.Add(userEntity);

            return userEntity.ToUserViewDTO();
        }
    }
}
