using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using ServerC.Interfaces;
using ServerC.Models;

namespace ServerC.Services
{
  public class TestRunsService : ITestRunsService
  {
    private readonly IDatabaseHelper _databaseHelper;

    public TestRunsService(IDatabaseHelper databaseHelper)
    {
      _databaseHelper = databaseHelper;
    }

    public async Task<TestRun> CreateTestRunAsync(CreateTestRunInput input)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        connection.Open();

        var parameters = new DynamicParameters();
        parameters.Add("@TestRunName", input.TestRunName);
        parameters.Add("@TestRunDate", input.TestRunDate);
        parameters.Add("@UserID", input.UserID);
        parameters.Add("@StartTime", input.StartTime);
        parameters.Add("@EndTime", input.EndTime);
        parameters.Add("@TestRunStatus", input.TestRunStatus);

        var testRunId = await connection.QuerySingleOrDefaultAsync<int>("dbo.CreateTestRun", parameters, commandType: CommandType.StoredProcedure);
        return await GetTestRunByIdAsync(testRunId);
      }
    }

    public async Task<TestRun> GetTestRunByIdAsync(int testRunId)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        connection.Open();

        var parameters = new DynamicParameters();
        parameters.Add("@TestRunID", testRunId);

        return await connection.QuerySingleOrDefaultAsync<TestRun>("dbo.GetTestRunById", parameters, commandType: CommandType.StoredProcedure);
      }
    }

    public async Task<IEnumerable<TestRun>> GetAllTestRunsAsync()
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        connection.Open();
        return await connection.QueryAsync<TestRun>("dbo.GetAllTestRuns", commandType: CommandType.StoredProcedure);
      }
    }

    public async Task<TestRun> UpdateTestRunAsync(int testRunId, CreateTestRunInput input)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        connection.Open();

        var parameters = new DynamicParameters();
        parameters.Add("@TestRunID", testRunId);
        parameters.Add("@TestRunName", input.TestRunName);
        parameters.Add("@TestRunDate", input.TestRunDate);
        parameters.Add("@UserID", input.UserID);
        parameters.Add("@StartTime", input.StartTime);
        parameters.Add("@EndTime", input.EndTime);
        parameters.Add("@TestRunStatus", input.TestRunStatus);

        await connection.ExecuteAsync("dbo.UpdateTestRun", parameters, commandType: CommandType.StoredProcedure);
        return await GetTestRunByIdAsync(testRunId);
      }
    }

    public async Task<bool> DeleteTestRunAsync(int testRunId)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        connection.Open();

        var parameters = new DynamicParameters();
        parameters.Add("@TestRunID", testRunId);

        int affectedRows = await connection.ExecuteAsync("dbo.DeleteTestRun", parameters, commandType: CommandType.StoredProcedure);
        return affectedRows > 0;
      }
    }
  }
}
