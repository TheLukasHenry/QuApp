using Dapper;
using ServerC.Interfaces;
using ServerC.Models;
using System.Data;

namespace ServerC.Services
{
  public class TestCasesService : ITestCasesService
  {
    private readonly IDatabaseHelper _databaseHelper;

    public TestCasesService(IDatabaseHelper databaseHelper)
    {
      _databaseHelper = databaseHelper;
    }

    public async Task<TestCase> CreateTestCaseAsync(CreateTestCaseInput input)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@featureId", input.featureId, DbType.Int32);
        parameters.Add("@name", input.name, DbType.String);
        parameters.Add("@sortOrder", input.sortOrder ?? 0, DbType.Int32);
        parameters.Add("@offset", input.offset ?? 0, DbType.Int32);

        TestCase createdTestCase = await connection.QuerySingleOrDefaultAsync<TestCase>("dbo.CreateTestCase", parameters, commandType: CommandType.StoredProcedure);
        return createdTestCase;
      }
    }

    public async Task<IEnumerable<TestCase>> GetAllTestCasesAsync()
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        return await connection.QueryAsync<TestCase>("GetAllTestCases", commandType: CommandType.StoredProcedure);
      }
    }

    public async Task<TestCase> GetTestCaseByIdAsync(int id)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        return await connection.QuerySingleOrDefaultAsync<TestCase>("GetTestCaseById", new { id }, commandType: CommandType.StoredProcedure);
      }
    }

    public async Task<TestCase> UpdateTestCaseAsync(UpdateTestCaseInput input)
    {
      using (var connection = _databaseHelper.GetConnection())
      {


        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@id", input.id, DbType.Int32);
        parameters.Add("@name", input.name, DbType.String);
        parameters.Add("@sortOrder", input.sortOrder, DbType.Int32);
        parameters.Add("@offset", input.offset, DbType.Int32);
        parameters.Add("@featureId", input.featureId, DbType.Int32);

        TestCase updatedTestCase = await connection.QuerySingleOrDefaultAsync<TestCase>("dbo.UpdateTestCase", parameters, commandType: CommandType.StoredProcedure);
        return updatedTestCase;
      }
    }

    public async Task<int> DeleteTestCaseAsync(int id)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        return await connection.ExecuteAsync("DeleteTestCase", new { id }, commandType: CommandType.StoredProcedure);
      }
    }
  }
}
