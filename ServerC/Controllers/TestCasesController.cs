using Microsoft.AspNetCore.Mvc;
using ServerC.Interfaces;
using ServerC.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ServerC.Controllers
{
  [Route("[controller]")]
  [ApiController]
  public class TestCasesController : ControllerBase
  {
    private readonly ITestCasesService _testCasesService;

    public TestCasesController(ITestCasesService testCasesService)
    {
      _testCasesService = testCasesService;
    }

    [HttpPost]
    public async Task<ActionResult<TestCase>> CreateTestCase([FromBody] CreateTestCaseInput input)
    {
      if (string.IsNullOrEmpty(input.name) || input.featureId <= 0)
      {
        return BadRequest("TestCase Id, name, and featureId must be valid.");
      }

      TestCase createdTestCase = await _testCasesService.CreateTestCaseAsync(input);
      if (createdTestCase == null)
      {
        return StatusCode(500, "An error occurred while creating the TestCase.");
      }

      return Ok(createdTestCase);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TestCase>>> GetAllTestCases()
    {
      IEnumerable<TestCase> testCases = await _testCasesService.GetAllTestCasesAsync();
      return Ok(testCases);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TestCase>> GetTestCaseById(int id)
    {
      if (id <= 0)
      {
        return BadRequest("TestCase Id must be valid.");
      }

      TestCase testCase = await _testCasesService.GetTestCaseByIdAsync(id);
      if (testCase == null)
      {
        return NotFound();
      }

      return Ok(testCase);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<TestCase>> UpdateTestCase(int id, [FromBody] TestCase testCase)
    {
      if (id != testCase.id || string.IsNullOrEmpty(testCase.name) || testCase.featureId <= 0)
      {
        return BadRequest("TestCase Id, name, and featureId must be valid.");
      }

      TestCase updatedTestCase = await _testCasesService.UpdateTestCaseAsync(testCase);
      if (updatedTestCase == null)
      {
        return StatusCode(500, "An error occurred while updating the TestCase.");
      }

      return Ok(updatedTestCase);
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTestCase(int id)
    {
      int result = await _testCasesService.DeleteTestCaseAsync(id);
      if (result == 0)
        return NotFound();

      return NoContent();
    }
  }
}
