// IUserService.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using ServerC.Models;


namespace ServerC.Interfaces
{
public interface IUserService
{
    Task<User> CreateUserAsync(CreateUserInput input);
    Task<User> GetUserByIdAsync(int userId);
    Task<IEnumerable<User>> GetAllUsersAsync();
    Task<User> UpdateUserAsync(User user);
    Task<bool> DeleteUserAsync(int userId);
    Task<User> GetUserByEmailAsync(string email);
    
}
}