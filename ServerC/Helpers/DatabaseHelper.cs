using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using ServerC.Models;
using Dapper;


namespace ServerC.Helpers
{
  public class DatabaseHelper
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

    public async Task<IEnumerable<Feature>> GetAllFeaturesAsync()
    {
      using (SqlConnection connection = GetConnection())
      {
        const string query = "SELECT * FROM feature"; // Replace 'Features' with the actual table name in your database
        IEnumerable<Feature> features = await connection.QueryAsync<Feature>(query);
        return features;
      }
    }

    // Add methods for executing queries here, e.g.:
    // public async Task<IEnumerable<YourModel>> GetYourModelsAsync() { ... }
  }
}
