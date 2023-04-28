// UsersService.cs
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using ServerC.Models;
using ServerC.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace ServerC.Services
{
  public class UsersService : IUsersService
  {
    private readonly IDatabaseHelper _databaseHelper;
    private readonly PasswordHasher<User> _passwordHasher;

    public UsersService(IDatabaseHelper databaseHelper, PasswordHasher<User> passwordHasher)
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
        return await GetUserByEmailAsync(user.Email);


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
        IEnumerable<User> users = await connection.QueryAsync<User>("dbo.GetAllUsers",
            commandType: CommandType.StoredProcedure);
        return users;

      }
    }


    public async Task<User> UpdateUserAsync(UpdateUserInput input)
    {
      try
      {
        using (var connection = _databaseHelper.GetConnection())
        {
          User user = await GetUserByIdAsync(input.UserID);
          var PasswordHash = System.Text.Encoding.ASCII.GetBytes(_passwordHasher.HashPassword(user, input.Password));

          using (var command = connection.CreateCommand())
          {
            command.CommandText = "dbo.UpdateUser";
            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@UserID", input.UserID);
            command.Parameters.AddWithValue("@UserName", input.UserName);
            command.Parameters.AddWithValue("@Email", input.Email);
            command.Parameters.AddWithValue("@PasswordHash", PasswordHash);

            await connection.OpenAsync();

            using (var reader = await command.ExecuteReaderAsync())
            {
              if (reader.Read())
              {
                User updatedUser = new User
                {
                  UserID = reader.GetInt32(0),
                  UserName = reader.GetString(1),
                  Email = reader.GetString(2),
                  PasswordHash = (byte[])reader[3]
                };

                return updatedUser;
              }
            }
          }
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine("Exception caught: " + ex.Message);
        throw;
      }

      return null;
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
