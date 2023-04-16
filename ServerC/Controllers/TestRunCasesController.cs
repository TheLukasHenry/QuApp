using Microsoft.AspNetCore.Mvc;
using ServerC.Interfaces;
using ServerC.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ServerC.Controllers
{
  [Route("[controller]")]
  [ApiController]
  public class TestRunCasesController : ControllerBase
  {
    private readonly ITestRunCasesService _testRunCasesService;

    public TestRunCasesController(ITestRunCasesService testRunCasesService)
    {
      _testRunCasesService = testRunCasesService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateTestRunCase([FromBody] TestRunCase testRunCase)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      TestRunCase result = await _testRunCasesService.CreateTestRunCaseAsync(testRunCase);
      if (result == null)
        return StatusCode(500);

      return CreatedAtAction(nameof(GetTestRunCaseById), new { id = testRunCase.TestRunCaseID }, testRunCase);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTestRunCaseById(int id)
    {
      TestRunCase testRunCase = await _testRunCasesService.GetTestRunCaseByIdAsync(id);
      if (testRunCase == null)
        return NotFound();

      return Ok(testRunCase);
    }

    [HttpGet("testrun/{testRunID}")]
    public async Task<IActionResult> GetTestRunCasesByTestRunID(int testRunID)
    {
      IEnumerable<TestRunCase> testRunCases = await _testRunCasesService.GetTestRunCasesByTestRunIDAsync(testRunID);
      return Ok(testRunCases);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTestRunCase(int id, [FromBody] TestRunCase testRunCase)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      if (id != testRunCase.TestRunCaseID)
        return BadRequest();

      bool result = await _testRunCasesService.UpdateTestRunCaseAsync(testRunCase);
      if (!result)
        return StatusCode(500);

      return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTestRunCase(int id)
    {
      bool result = await _testRunCasesService.DeleteTestRunCaseAsync(id);
      if (!result)
        return NotFound();

      return NoContent();
    }
  }
}
