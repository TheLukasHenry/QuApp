using Microsoft.Data.SqlClient;
using ServerC.Models;

public class DataContext : IDisposable
{
   private readonly string _connectionString;

    public DataContext(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("MainDatabase");
    }

    public SqlConnection GetConnection()
    {
        return new SqlConnection(_connectionString);
    }

    public async Task<List<Company>> GetCompanies()
    {
        using (var connection = GetConnection())
        {
            var command = new SqlCommand("GetAllCompanies", connection);
            command.CommandType = System.Data.CommandType.StoredProcedure;

            var reader = await command.ExecuteReaderAsync();

            var companies = new List<Company>();
            while (reader.Read())
            {
                var company = new Company
                {
                    CompanyName = (string)reader["CompanyName"]
                };

                companies.Add(company);
            }

            return companies;
        }
    }

    public async Task AddCompany(Company company)
    {
        using (var connection = GetConnection())
        {
            var command = new SqlCommand("AddCompany", connection);
            command.CommandType = System.Data.CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@CompanyName", company.CompanyName);

            await command.ExecuteNonQueryAsync();
        }
    }



  // Other stored procedure methods here

  public void Dispose()
  {
    // Dispose of any resources
    
  }
}
