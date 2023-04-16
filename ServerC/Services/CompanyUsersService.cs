using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using ServerC.Interfaces;
using ServerC.Models;

namespace ServerC.Services
{
  public class CompanyUsersService : ICompanyUsersService
  {
    private readonly IDatabaseHelper _databaseHelper;

    public CompanyUsersService(IDatabaseHelper databaseHelper)
    {
      _databaseHelper = databaseHelper;
    }

    public async Task<CompanyUser> AddCompanyUserAsync(CompanyUser companyUser)
    {
      using (IDbConnection connection = _databaseHelper.GetConnection())
      {
        await connection.ExecuteAsync("[dbo].[AddCompanyUser]",
            new { CompanyID = companyUser.CompanyID, UserID = companyUser.UserID },
            commandType: CommandType.StoredProcedure);

        return companyUser;
      }
    }

    public async Task<IEnumerable<CompanyUser>> GetCompanyUsersByCompanyIdAsync(int companyId)
    {
      using (IDbConnection connection = _databaseHelper.GetConnection())
      {
        return await connection.QueryAsync<CompanyUser>("[dbo].[GetCompanyUsersByCompanyId]",
            new { CompanyID = companyId }, commandType: CommandType.StoredProcedure);
      }
    }

    public async Task<IEnumerable<CompanyUser>> GetCompanyUsersByUserIdAsync(int userId)
    {
      using (IDbConnection connection = _databaseHelper.GetConnection())
      {
        return await connection.QueryAsync<CompanyUser>("[dbo].[GetCompanyUsersByUserId]",
            new { UserID = userId }, commandType: CommandType.StoredProcedure);
      }
    }

    public async Task<bool> RemoveCompanyUserAsync(int companyId, int userId)
    {
      using (IDbConnection connection = _databaseHelper.GetConnection())
      {
        int affectedRows = await connection.ExecuteAsync("[dbo].[RemoveCompanyUser]",
            new { CompanyID = companyId, UserID = userId }, commandType: CommandType.StoredProcedure);

        return affectedRows > 0;
      }
    }
  }
}
