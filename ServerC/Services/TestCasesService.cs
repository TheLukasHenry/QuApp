using Dapper;
using Microsoft.Data.SqlClient;
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

public async Task<int> CreateTestCaseAsync(TestCase testCase)
{
            using (var connection = _databaseHelper.GetConnection())

    {
        return await connection.ExecuteAsync("CreateTestCase",
            new { FeatureID = testCase.FeatureID, TestCaseName = testCase.TestCaseName, TestCaseOrder = testCase.TestCaseOrder },
            commandType: CommandType.StoredProcedure);
    }
}

public async Task<IEnumerable<TestCase>> GetAllTestCasesAsync()
{
            using (var connection = _databaseHelper.GetConnection())

    {
        return await connection.QueryAsync<TestCase>("GetAllTestCases", commandType: CommandType.StoredProcedure);
    }
}

public async Task<TestCase> GetTestCaseByIdAsync(int testCaseId)
{
            using (var connection = _databaseHelper.GetConnection())

    {
        return await connection.QuerySingleOrDefaultAsync<TestCase>("GetTestCaseById", new { TestCaseID = testCaseId }, commandType: CommandType.StoredProcedure);
    }
}

public async Task<int> UpdateTestCaseAsync(TestCase testCase)
{
            using (var connection = _databaseHelper.GetConnection())

    {
        return await connection.ExecuteAsync("UpdateTestCase",
            new { TestCaseID = testCase.TestCaseID, FeatureID = testCase.FeatureID, TestCaseName = testCase.TestCaseName, TestCaseOrder = testCase.TestCaseOrder },
            commandType: CommandType.StoredProcedure);
    }
}

public async Task<int> DeleteTestCaseAsync(int testCaseId)
{
            using (var connection = _databaseHelper.GetConnection())

    {
        return await connection.ExecuteAsync("DeleteTestCase", new { TestCaseID = testCaseId }, commandType: CommandType.StoredProcedure);
    }
}
    // Implement the methods from ITestCasesService here
    // (same code as provided in the previous answer)
}


}