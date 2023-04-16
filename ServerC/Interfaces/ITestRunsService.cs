using System.Collections.Generic;
using ServerC.Models;

namespace ServerC.Interfaces
{

  public interface ITestRunsService
  {
    Task<TestRun> CreateTestRunAsync(CreateTestRunInput input);
    Task<TestRun> GetTestRunByIdAsync(int testRunId);
    Task<IEnumerable<TestRun>> GetAllTestRunsAsync();
    Task<TestRun> UpdateTestRunAsync(int testRunId, CreateTestRunInput input);
    Task<bool> DeleteTestRunAsync(int testRunId);
    //   TestRun UpdateTestRun(TestRun testRun);
    //   void DeleteTestRun(int testRunId);
  }
}
