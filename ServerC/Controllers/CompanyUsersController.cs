using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ServerC.Interfaces;
using ServerC.Models;

namespace ServerC.Controllers
{
  [Route("[controller]")]
  [ApiController]
  public class CompanyUsersController : ControllerBase
  {
    private readonly ICompanyUsersService _companyUsersService;

    public CompanyUsersController(ICompanyUsersService companyUsersService)
    {
      _companyUsersService = companyUsersService;
    }

    [HttpPost]
    public async Task<IActionResult> AddCompanyUser([FromBody] CompanyUser companyUser)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      CompanyUser createdCompanyUser = await _companyUsersService.AddCompanyUserAsync(companyUser);
      if (createdCompanyUser == null)
        return StatusCode(500);

      return CreatedAtAction(nameof(GetCompanyUsersByCompanyId), new { companyId = createdCompanyUser.CompanyID }, createdCompanyUser);
    }

    [HttpGet("company/{companyId}")]
    public async Task<IActionResult> GetCompanyUsersByCompanyId(int companyId)
    {
      IEnumerable<CompanyUser> companyUsers = await _companyUsersService.GetCompanyUsersByCompanyIdAsync(companyId);
      return Ok(companyUsers);
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetCompanyUsersByUserId(int userId)
    {
      IEnumerable<CompanyUser> companyUsers = await _companyUsersService.GetCompanyUsersByUserIdAsync(userId);
      return Ok(companyUsers);
    }

    [HttpDelete("{companyId}/{userId}")]
    public async Task<IActionResult> RemoveCompanyUser(int companyId, int userId)
    {
      bool result = await _companyUsersService.RemoveCompanyUserAsync(companyId, userId);
      if (!result)
        return NotFound();

      return NoContent();
    }
  }
}
