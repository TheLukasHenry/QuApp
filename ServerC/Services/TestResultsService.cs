using Dapper;
using ServerC.Interfaces;
using ServerC.Models;
using System.Data;

namespace ServerC.Services
{
  public class TestResultsService : ITestResultsService
  {
    private readonly IDatabaseHelper _databaseHelper;

    public TestResultsService(IDatabaseHelper databaseHelper)
    {
      _databaseHelper = databaseHelper;
    }

    public async Task<TestResult> CreateTestResultAsync(CreateTestResultInput input)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@featureId", input.featureId, DbType.Int32);
        parameters.Add("@resultsJson", input.resultsJson, DbType.String);
        parameters.Add("@userId", input.userId, DbType.Int32);
        parameters.Add("@date", input.date, DbType.Date);

        TestResult createdTestResult = await connection.QuerySingleOrDefaultAsync<TestResult>("dbo.InsertTestResults", parameters, commandType: CommandType.StoredProcedure);
        return createdTestResult;
      }
    }

    public async Task<IEnumerable<TestResult>> GetAllTestResultsAsync()
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        return await connection.QueryAsync<TestResult>("GetAllTestResults", commandType: CommandType.StoredProcedure);
      }
    }

    public async Task<IEnumerable<TestResult>> GetTestResultsByFeatureIdAsync(int featureId)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        return await connection.QueryAsync<TestResult>("GetTestResultsByFeatureId", new { featureId }, commandType: CommandType.StoredProcedure);
      }
    }
    // Implement other methods here...
  }
}
