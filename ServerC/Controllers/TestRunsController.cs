using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ServerC.Interfaces;
using ServerC.Models;

namespace ServerC.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class TestRunsController : ControllerBase
  {
    private readonly ITestRunsService _testRunsService;

    public TestRunsController(ITestRunsService testRunsService)
    {
      _testRunsService = testRunsService;
    }

    [HttpPost]
    public async Task<ActionResult<TestRun>> CreateTestRun([FromBody] CreateTestRunInput input)
    {
      var testRun = await _testRunsService.CreateTestRunAsync(input);
      return CreatedAtAction(nameof(GetTestRunById), new { testRunId = testRun.TestRunID }, testRun);
    }

    [HttpGet("{testRunId}")]
    public async Task<ActionResult<TestRun>> GetTestRunById(int testRunId)
    {
      var testRun = await _testRunsService.GetTestRunByIdAsync(testRunId);

      if (testRun == null)
      {
        return NotFound();
      }

      return testRun;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TestRun>>> GetAllTestRuns()
    {
      var testRuns = await _testRunsService.GetAllTestRunsAsync();
      return Ok(testRuns);
    }

    [HttpPut("{testRunId}")]
    public async Task<ActionResult<TestRun>> UpdateTestRun(int testRunId, CreateTestRunInput input)
    {
      var testRun = await _testRunsService.UpdateTestRunAsync(testRunId, input);

      if (testRun == null)
      {
        return NotFound();
      }

      return testRun;
    }

    [HttpDelete("{testRunId}")]
    public async Task<IActionResult> DeleteTestRun(int testRunId)
    {
      bool isDeleted = await _testRunsService.DeleteTestRunAsync(testRunId);

      if (!isDeleted)
      {
        return NotFound();
      }

      return NoContent();
    }
  }
}
