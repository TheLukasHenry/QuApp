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
    public async Task<IActionResult> CreateTestCase([FromBody] TestCase testCase)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        int result = await _testCasesService.CreateTestCaseAsync(testCase);
        if (result == 0)
            return StatusCode(500);

        return CreatedAtAction(nameof(GetTestCaseById), new { id = testCase.TestCaseID }, testCase);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllTestCases()
    {
        IEnumerable<TestCase> testCases = await _testCasesService.GetAllTestCasesAsync();
        return Ok(testCases);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTestCaseById(int id)
    {
        TestCase testCase = await _testCasesService.GetTestCaseByIdAsync(id);
        if (testCase == null)
            return NotFound();

        return Ok(testCase);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTestCase(int id, [FromBody] TestCase testCase)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (id != testCase.TestCaseID)
            return BadRequest();

        int result = await _testCasesService.UpdateTestCaseAsync(testCase);
        if (result == 0)
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