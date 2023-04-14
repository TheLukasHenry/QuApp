using Microsoft.Data.SqlClient;
// using Microsoft.Extensions.Configuration;

// using System.Collections.Generic;
// using System.Threading.Tasks;
// using Microsoft.Data.SqlClient;
using ServerC.Models;
using Dapper;
using System.Data;
// using MainRepository;

namespace ServerC.Helpers
{
  public class DatabaseHelper : IDatabaseHelper
  {
    private readonly IConfiguration _configuration;

    public DatabaseHelper(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    public SqlConnection GetConnection()
    {
      string connectionString = _configuration.GetConnectionString("MainDatabase");
      return new SqlConnection(connectionString);
    }









    // Methods

    public async Task<IEnumerable<Feature>> GetAllFeaturesAsync()
    {
      using (SqlConnection connection = GetConnection())
      {
        const string query = "EXEC GetAllFeatures"; // Replace 'Features' with the actual table name in your database
        IEnumerable<Feature> features = await connection.QueryAsync<Feature>(query);
        return features;
      }
    }

public async Task<Company> CreateCompanyAsync(string companyName)
{
    using (SqlConnection connection = GetConnection())
    {
        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@CompanyName", companyName, DbType.String);

        Company company = await connection.QuerySingleOrDefaultAsync<Company>("dbo.CreateCompany", parameters, commandType: CommandType.StoredProcedure);
        return company;
    }
}
//     public async Task<IEnumerable<Company>> GetAllCompaniesAsync()
// {
//     using (SqlConnection connection = GetConnection())
//     {
//         IEnumerable<Company> companies = await connection.QueryAsync<Company>("dbo.GetAllCompanies", commandType: CommandType.StoredProcedure);
//         return companies;
//     }
// }

public async Task<IEnumerable<Company>> GetAllCompaniesAsync()
        {
            using (SqlConnection connection = GetConnection())
            {
                const string query = "EXEC GetAllCompanies";
                IEnumerable<Company> companies = await connection.QueryAsync<Company>(query);
                return companies;
            }
        }

public async Task<Company> GetCompanyByIdAsync(int id)
{
    using (SqlConnection connection = GetConnection())
    {
        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@CompanyID", id);
        Company company = await connection.QuerySingleOrDefaultAsync<Company>("dbo.GetCompanyById", parameters, commandType: CommandType.StoredProcedure);
        return company;
    }
}
  }
}
