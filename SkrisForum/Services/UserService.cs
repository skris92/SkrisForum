using SkrisForum.Core.Extensions;
using SkrisForum.Core.Model.UserDTOs;
using SkrisForum.Data.Entities;
using SkrisForum.Data.Repositories;

namespace SkrisForum.Services
{
    public class UserService : IUserService
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

        public async Task<UserViewDTO> GetUserByUsername(string username)
        {
            User user = await _userRepository.GetByUsername(username);
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

        public async Task<UserViewDTO> DeleteUser(Guid userId)
        {
            var userToDelete = await _userRepository.GetById(userId);

            await _userRepository.Delete(userToDelete);

            return userToDelete.ToUserViewDTO();
        }

        public async Task<UserViewDTO> UpdateUser(Guid userId, UserUpdateDTO updateDto)
        {
            var userToUpdate = await _userRepository.GetById(userId);

            userToUpdate.EmailAddress = updateDto.EmailAddress ?? userToUpdate.EmailAddress;
            userToUpdate.Username = updateDto.Username ?? userToUpdate.Username;
            userToUpdate.HashedPassword = (updateDto.Password != null) ? BCrypt.Net.BCrypt.HashPassword(updateDto.Password) : userToUpdate.HashedPassword;
            if (updateDto.Role != null) userToUpdate.Role = (UserRole)Enum.Parse(typeof(UserRole), updateDto.Role);

            await _userRepository.Update(userToUpdate);
            return userToUpdate.ToUserViewDTO();
        }
    }
}
