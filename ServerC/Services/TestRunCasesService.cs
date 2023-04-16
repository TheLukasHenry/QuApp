using Dapper;
using ServerC.Interfaces;
using ServerC.Models;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace ServerC.Services
{
  public class TestRunCasesService : ITestRunCasesService
  {
    private readonly IDatabaseHelper _databaseHelper;

    public TestRunCasesService(IDatabaseHelper databaseHelper)
    {
      _databaseHelper = databaseHelper;
    }

    public async Task<TestRunCase> CreateTestRunCaseAsync(TestRunCase testRunCase)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        int testRunCaseID = await connection.ExecuteScalarAsync<int>("CreateTestRunCase",
            new
            {
              TestRunID = testRunCase.TestRunID,
              TestCaseID = testRunCase.TestCaseID,
              TestCaseStatus = testRunCase.TestCaseStatus,
              TestCaseComment = testRunCase.TestCaseComment
            },
            commandType: CommandType.StoredProcedure);

        testRunCase.TestRunCaseID = testRunCaseID;
        return testRunCase;
      }
    }

    public async Task<IEnumerable<TestRunCase>> GetTestRunCasesByTestRunIDAsync(int testRunID)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        return await connection.QueryAsync<TestRunCase>("GetTestRunCasesByTestRunID", new { TestRunID = testRunID }, commandType: CommandType.StoredProcedure);
      }
    }

    public async Task<bool> UpdateTestRunCaseAsync(TestRunCase testRunCase)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        int rowsAffected = await connection.ExecuteAsync("UpdateTestRunCase",
            new
            {
              TestRunCaseID = testRunCase.TestRunCaseID,
              TestRunID = testRunCase.TestRunID,
              TestCaseID = testRunCase.TestCaseID,
              TestCaseStatus = testRunCase.TestCaseStatus,
              TestCaseComment = testRunCase.TestCaseComment
            },
            commandType: CommandType.StoredProcedure);

        return rowsAffected > 0;
      }
    }

    public async Task<bool> DeleteTestRunCaseAsync(int testRunCaseID)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        int rowsAffected = await connection.ExecuteAsync("DeleteTestRunCase", new { TestRunCaseID = testRunCaseID }, commandType: CommandType.StoredProcedure);
        return rowsAffected > 0;
      }
    }

    public async Task<TestRunCase> GetTestRunCaseByIdAsync(int testRunCaseId)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        return await connection.QuerySingleOrDefaultAsync<TestRunCase>("GetTestRunCaseById", new { TestRunCaseID = testRunCaseId }, commandType: CommandType.StoredProcedure);
      }
    }
  }
}
