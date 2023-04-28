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
    public async Task<ActionResult<TestCase>> CreateTestCase([FromBody] TestCase testCase)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      TestCase result = await _testCasesService.CreateTestCaseAsync(testCase);
      if (result == null)
        return StatusCode(500);

      return CreatedAtAction(nameof(GetTestCaseById), new { id = testCase.TestCaseID }, testCase);
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
      TestCase testCase = await _testCasesService.GetTestCaseByIdAsync(id);
      if (testCase == null)
        return NotFound();

      return Ok(testCase);
    }

    // write a method to update a test case, return 404 if not found, 500 if error, 204 with the testCase if successful
    [HttpPut("{id}")]
    public async Task<ActionResult<TestCase>> UpdateTestCase(int id, [FromBody] TestCase testCase)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      if (id != testCase.TestCaseID)
        return BadRequest();

      TestCase updatedTestCase = await _testCasesService.UpdateTestCaseAsync(testCase);
      if (updatedTestCase == null)
        return StatusCode(500);

      return NoContent();


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