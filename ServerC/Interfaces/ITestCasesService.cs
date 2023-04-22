// ITestCasesService.cs
using ServerC.Models;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ServerC.Interfaces
{
  public interface ITestCasesService
  {
    Task<int> CreateTestCaseAsync(TestCase testCase);
    Task<IEnumerable<TestCase>> GetAllTestCasesAsync();
    Task<TestCase> GetTestCaseByIdAsync(int testCaseId);
    // Task<int> UpdateTestCaseAsync(TestCase testCase);
    Task<TestCase> UpdateTestCaseAsync(TestCase testCase);
    Task<int> DeleteTestCaseAsync(int testCaseId);
  }
}