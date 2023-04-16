using ServerC.Models;

namespace ServerC.Interfaces
{
  public interface ITestRunCasesService
  {
    Task<TestRunCase> CreateTestRunCaseAsync(TestRunCase testRunCase);
    Task<IEnumerable<TestRunCase>> GetTestRunCasesByTestRunIDAsync(int testRunID);
    Task<bool> UpdateTestRunCaseAsync(TestRunCase testRunCase);
    Task<bool> DeleteTestRunCaseAsync(int testRunCaseID);
    Task<TestRunCase> GetTestRunCaseByIdAsync(int testRunCaseId);
  }
}