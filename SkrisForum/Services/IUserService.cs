using SkrisForum.Core.Model.UserDTOs;

namespace SkrisForum.Services
{
    public interface IUserService
    {
        Task<List<UserViewDTO>> GetAllUsers();
        Task<UserViewDTO> GetUserById(Guid userId);
        Task<UserViewDTO> GetUserByUsername(string username);
        Task<UserLoginDTO> GetLoginDTOByUsername(string username);
        Task<UserViewDTO> AddUser(UserCreateDTO newUser);
        Task<UserViewDTO> DeleteUser(Guid userId);
        Task<UserViewDTO> UpdateUser(Guid userId, UserUpdateDTO updateDto);
    }
}
