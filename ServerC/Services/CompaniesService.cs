using ServerC.Models;
using Microsoft.Data.SqlClient;
using Dapper;
using System.Data;



namespace ServerC.Services
{
  public class CompaniesService : ICompaniesService
    {



          private readonly IConfiguration _configuration;



    public SqlConnection GetConnection()
    {
      string connectionString = _configuration.GetConnectionString("MainDatabase");
      return new SqlConnection(connectionString);
    }

        public CompaniesService(IConfiguration configuration)
    {
      _configuration = configuration;
    }


public async Task<IEnumerable<Company>> GetAllCompaniesAsync()
        {
      using (SqlConnection connection = GetConnection())

            {
                const string query = "EXEC GetAllCompanies";
                IEnumerable<Company> companies = await connection.QueryAsync<Company>(query);
                return companies;
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