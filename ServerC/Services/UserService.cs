// UserService.cs
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using ServerC.Models;
using ServerC.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace ServerC.Services
{
    public class UserService : IUserService
    {
      private readonly IDatabaseHelper _databaseHelper;
    private readonly PasswordHasher<User> _passwordHasher;

    public UserService(IDatabaseHelper databaseHelper, PasswordHasher<User> passwordHasher)
    {
        _databaseHelper = databaseHelper;
        _passwordHasher = passwordHasher;
    }

    public async Task<User> CreateUserAsync(CreateUserInput input)
    {
        User user = new User
        {
            UserName = input.UserName,
            Email = input.Email,
        };

        user.PasswordHash = System.Text.Encoding.ASCII.GetBytes(_passwordHasher.HashPassword(user, input.Password));

        using (var connection = _databaseHelper.GetConnection())
        {
            await connection.ExecuteAsync("dbo.CreateUser",
                new { user.UserName, user.Email, user.PasswordHash },
                commandType: CommandType.StoredProcedure);
            return user;
        }
    }

        public async Task<User> GetUserByIdAsync(int userId)
        {
            using (var connection = _databaseHelper.GetConnection())
            {
                return await connection.QuerySingleOrDefaultAsync<User>("dbo.GetUserById",
                    new { UserID = userId },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            using (var connection = _databaseHelper.GetConnection())
            {
                return await connection.QueryAsync<User>("dbo.GetAllUsers",
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<User> UpdateUserAsync(User user)
        {
            using (var connection = _databaseHelper.GetConnection())
            {
                await connection.ExecuteAsync("dbo.UpdateUser",
                    new { user.UserID, user.UserName, user.Email, user.PasswordHash },
                    commandType: CommandType.StoredProcedure);
                return user;
            }
        }

        public async Task<bool> DeleteUserAsync(int userId)
        {
            using (var connection = _databaseHelper.GetConnection())
            {
                int affectedRows = await connection.ExecuteAsync("dbo.DeleteUser",
                    new { UserID = userId },
                    commandType: CommandType.StoredProcedure);
                return affectedRows > 0;
            }
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            using (var connection = _databaseHelper.GetConnection())
            {
                return await connection.QuerySingleOrDefaultAsync<User>("dbo.GetUserByEmail",
                    new { Email = email },
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
