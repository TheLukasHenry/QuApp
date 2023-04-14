// NOT USED
using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;
// using ServerC.Helpers;
using ServerC.Models;
// wrap the connection in a using statement


namespace MainRepository
{
public class CompanyRepository : ICompanyRepository
{
    private readonly DataContext _context;

    public CompanyRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<List<Company>> GetAllCompaniesAsync()
    {
        return await _context.GetCompanies();
    }

    public async Task AddCompany(Company company)
    {
        await _context.AddCompany(company);
    }

   public async Task<Company> CreateCompanyAsync(string companyName)
{
    using (var connection = _context.GetConnection())
    {
        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@CompanyName", companyName, DbType.String);

        Company company = await connection.QuerySingleOrDefaultAsync<Company>("dbo.CreateCompany", parameters, commandType: CommandType.StoredProcedure);
        return company;
    }
}

// public async Task<Company> CreateCompanyAsync(string companyName)
// {
//     Company createdCompany = await _context.CreateCompanyAsync(companyName);
//     return createdCompany;
// }


  public Task<IEnumerable<Company>> GetAllAsync()
  {
    throw new NotImplementedException();
  }

  public Task<Company> GetByIdAsync(int id)
  {
    throw new NotImplementedException();
  }

  public Task AddAsync(Company company)
  {
    throw new NotImplementedException();
  }

  public Task UpdateAsync(Company company)
  {
    throw new NotImplementedException();
  }

  public Task DeleteAsync(int id)
  {
    throw new NotImplementedException();
  }
}
public class FeatureRepository : IFeatureRepository
{
    private readonly DataContext _context;

    public FeatureRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<List<Feature>> GetAllFeatures()
    {
        using (var connection = _context.GetConnection())
        {
            var command = new SqlCommand("GetAllFeatures", connection);
            command.CommandType = System.Data.CommandType.StoredProcedure;

            var reader = await command.ExecuteReaderAsync();

            var features = new List<Feature>();
            while (reader.Read())
            {
                var feature = new Feature
                {
                    // FeatureId = (int)reader["FeatureId"],
                    FeatureName = (string)reader["FeatureName"],
                    CompanyID = (int)reader["CompanyID"]
                };

                features.Add(feature);
            }

            return features;
        }
    }

  Task IFeatureRepository.AddAsync(Feature feature)
  {
    throw new NotImplementedException();
  }

  Task IFeatureRepository.DeleteAsync(int id)
  {
    throw new NotImplementedException();
  }

  Task<IEnumerable<Feature>> IFeatureRepository.GetAllAsync()
  {
    throw new NotImplementedException();
  }

  Task<Feature> IFeatureRepository.GetByIdAsync(int id)
  {
    throw new NotImplementedException();
  }

  Task<IEnumerable<Feature>> IFeatureRepository.GetFeaturesByCompanyIdAsync(int companyId)
  {
    throw new NotImplementedException();
  }

  Task IFeatureRepository.UpdateAsync(Feature feature)
  {
    throw new NotImplementedException();
  }

  // Other stored procedure methods here
}
public class StatusRepository : IStatusRepository
{
    private readonly DataContext _context;

    public StatusRepository(DataContext context)
    {
        _context = context;
    }

  public Task AddAsync(Status status)
  {
    throw new NotImplementedException();
  }

  public Task DeleteAsync(int id)
  {
    throw new NotImplementedException();
  }

  public Task<IEnumerable<Status>> GetAllAsync()
  {
    throw new NotImplementedException();
  }

  public async Task<List<Status>> GetAllStatuses()
    {
        using (var connection = _context.GetConnection())
        {
            var command = new SqlCommand("GetAllStatuses", connection);
            command.CommandType = System.Data.CommandType.StoredProcedure;

            var reader = await command.ExecuteReaderAsync();

            var statuses = new List<Status>();
            while (reader.Read())
            {
                var status = new Status
                {
                    StatusID = (int)reader["StatusID"],
                    StatusName = (string)reader["StatusName"]
                };

                statuses.Add(status);
            }

            return statuses;
        }
    }

  public Task<Status> GetByIdAsync(int id)
  {
    throw new NotImplementedException();
  }

  public Task UpdateAsync(Status status)
  {
    throw new NotImplementedException();
  }

  // Other stored procedure methods here
}
public class TestCaseRepository : ITestCaseRepository
{
    private readonly DataContext _context;

    public TestCaseRepository(DataContext context)
    {
        _context = context;
    }

  public Task AddAsync(TestCase testCase)
  {
    throw new NotImplementedException();
  }

  public Task DeleteAsync(int id)
  {
    throw new NotImplementedException();
  }

  public Task<IEnumerable<TestCase>> GetAllAsync()
  {
    throw new NotImplementedException();
  }

  public async Task<List<TestCase>> GetAllTestCases()
    {
        using (var connection = _context.GetConnection())
        {
            var command = new SqlCommand("GetAllTestCases", connection);
            command.CommandType = System.Data.CommandType.StoredProcedure;

            var reader = await command.ExecuteReaderAsync();

            var testCases = new List<TestCase>();
            while (reader.Read())
            {
                var testCase = new TestCase
                {
                    TestCaseID = (int)reader["TestCaseID"],
                    FeatureID = (int)reader["FeatureID"],
                    TestCaseName = (string)reader["TestCaseName"],
                    TestCaseOrder = (int)reader["TestCaseOrder"]
                };

                testCases.Add(testCase);
            }

            return testCases;
        }
    }

  public Task<TestCase> GetByIdAsync(int id)
  {
    throw new NotImplementedException();
  }

  public Task<IEnumerable<TestCase>> GetTestCasesByFeatureIdAsync(int featureId)
  {
    throw new NotImplementedException();
  }

  public Task UpdateAsync(TestCase testCase)
  {
    throw new NotImplementedException();
  }

  // Other stored procedure methods here
}
public class TestRunCaseRepository : ITestRunCaseRepository
{
    private readonly DataContext _context;

    public TestRunCaseRepository(DataContext context)
    {
        _context = context;
    }

  public Task AddAsync(TestRunCase testRunCase)
  {
    throw new NotImplementedException();
  }

  public Task DeleteAsync(int id)
  {
    throw new NotImplementedException();
  }

  public Task<IEnumerable<TestRunCase>> GetAllAsync()
  {
    throw new NotImplementedException();
  }

  public async Task<List<TestRunCase>> GetAllTestRunCases()
    {
 using (var connection = _context.GetConnection())
{
    var command = new SqlCommand("SELECT TestRunCaseID, TestRunID, TestCaseID, TestCaseStatus, TestCaseComment FROM TestRunCases", connection);
    var reader = await command.ExecuteReaderAsync();
    
    var testRunCases = new List<TestRunCase>();
    while (reader.Read())
    {
        var testRunCase = new TestRunCase
        {
            TestRunCaseID = (int)reader["TestRunCaseID"],
            TestRunID = (int)reader["TestRunID"],
            TestCaseID = (int)reader["TestCaseID"],
            TestCaseStatus = (int)reader["TestCaseStatus"],
            TestCaseComment = (string)reader["TestCaseComment"]
        };

        testRunCases.Add(testRunCase);
    }

    return testRunCases;
}

    }

  public Task<TestRunCase> GetByIdAsync(int id)
  {
    throw new NotImplementedException();
  }

  public Task<IEnumerable<TestRunCase>> GetTestRunCasesByTestRunIdAsync(int testRunId)
  {
    throw new NotImplementedException();
  }

  public Task UpdateAsync(TestRunCase testRunCase)
  {
    throw new NotImplementedException();
  }

  // Other stored procedure methods here
}
public class UserRepository : IUserRepository
{
    private readonly DataContext _context;

    public UserRepository(DataContext context)
    {
        _context = context;
    }

  public Task AddAsync(User user)
  {
    throw new NotImplementedException();
  }

  public Task DeleteAsync(int id)
  {
    throw new NotImplementedException();
  }

  public Task<IEnumerable<User>> GetAllAsync()
  {
    throw new NotImplementedException();
  }

  public async Task<List<User>> GetAllUsers()
    {
        using (var connection = _context.GetConnection())
        {
            var command = new SqlCommand("GetAllUsers", connection);
            command.CommandType = System.Data.CommandType.StoredProcedure;

            var reader = await command.ExecuteReaderAsync();

            var users = new List<User>();
            while (reader.Read())
            {
                var user = new User
                {
                    UserID = (int)reader["UserID"],
                    UserName = (string)reader["UserName"],
                    Email = (string)reader["Email"],
                    PasswordHash = (byte[])reader["PasswordHash"]
                };

                users.Add(user);
            }

            return users;
        }
    }

  public Task<User> GetByIdAsync(int id)
  {
    throw new NotImplementedException();
  }

  public Task<User> GetUserByEmailAsync(string email)
  {
    throw new NotImplementedException();
  }

  public Task UpdateAsync(User user)
  {
    throw new NotImplementedException();
  }

  // Other stored procedure methods here
}
}

