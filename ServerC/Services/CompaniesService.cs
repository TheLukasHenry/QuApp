
using Dapper;
using ServerC.Interfaces;
using ServerC.Models;
using System.Data;



namespace ServerC.Services
{
  public class CompaniesService : ICompaniesService
  {
    private readonly IDatabaseHelper _databaseHelper;

    public CompaniesService(IDatabaseHelper databaseHelper)
    {
      _databaseHelper = databaseHelper;
    }

    public async Task<IEnumerable<Company>> GetAllCompaniesAsync()
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        const string query = "EXEC GetAllCompanies";
        IEnumerable<Company> companies = await connection.QueryAsync<Company>(query);
        return companies;
      }
    }


    public async Task<Company> CreateCompanyAsync(string companyName)
    {
      using (var connection = _databaseHelper.GetConnection())


      {
        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@CompanyName", companyName, DbType.String);

        Company company = await connection.QuerySingleOrDefaultAsync<Company>("dbo.CreateCompany", parameters, commandType: CommandType.StoredProcedure);
        return company;
      }
    }


    public async Task<Company> GetCompanyByIdAsync(int id)
    {
      using (var connection = _databaseHelper.GetConnection())


      {
        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@CompanyID", id);
        Company company = await connection.QuerySingleOrDefaultAsync<Company>("dbo.GetCompanyById", parameters, commandType: CommandType.StoredProcedure);
        return company;
      }
    }

    public async Task<Company> UpdateCompanyAsync(Company company)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        //    update the company in the database and return the updated company object!!! copilot do this for me
        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@CompanyID", company.CompanyID, DbType.Int32);
        parameters.Add("@CompanyName", company.CompanyName, DbType.String);

        Company updatedCompany = await connection.QuerySingleOrDefaultAsync<Company>("dbo.UpdateCompany", parameters, commandType: CommandType.StoredProcedure);
        return updatedCompany;


      }
    }








    // return await connection.ExecuteAsync("UpdateCompany",
    //     new { CompanyID = company.CompanyID, CompanyName = company.CompanyName },
    //     commandType: CommandType.StoredProcedure);
    //   }
    // }

    public async Task<bool> DeleteCompanyAsync(int companyId)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@CompanyID", companyId, DbType.Int32);

        int affectedRows = await connection.ExecuteAsync("dbo.DeleteCompany", parameters, commandType: CommandType.StoredProcedure);
        return affectedRows > 0;
      }
    }
  }
}
