using Microsoft.AspNetCore.Mvc;
using ServerC.Models;
using ServerC.Interfaces;


namespace ServerC.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class CompaniesController : ControllerBase
  {
    private readonly ICompaniesService _companiesService;

    public CompaniesController(ICompaniesService companiesService)
    {
      _companiesService = companiesService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Company>>> GetAllCompanies()
    {
      IEnumerable<Company> companies = await _companiesService.GetAllCompaniesAsync();
      return Ok(companies);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Company>> GetCompany(int id)
    {
      Company company = await _companiesService.GetCompanyByIdAsync(id);
      if (company == null)
      {
        return NotFound();
      }

      return company;
    }

    [HttpPost]
    public async Task<ActionResult<Company>> CreateCompany([FromBody] Company company)
    {
      if (string.IsNullOrEmpty(company.CompanyName))
      {
        return BadRequest("CompanyName cannot be empty.");
      }

      Company createdCompany = await _companiesService.CreateCompanyAsync(company.CompanyName);
      if (createdCompany == null)
      {
        return StatusCode(500, "An error occurred while creating the company.");
      }

      return Ok(createdCompany);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCompany(int id, [FromBody] Company company)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);
      if (id != company.CompanyID)
      {
        return BadRequest("CompanyID in the URL does not match the CompanyID in the request body.");
      }

      Company updatedCompany = await _companiesService.UpdateCompanyAsync(company);
      if (updatedCompany == null)
      {
        return StatusCode(500, "An error occurred while updating the company.");
      }

      return Ok(updatedCompany);

    }



    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCompany(int id)
    {
      bool isDeleted = await _companiesService.DeleteCompanyAsync(id);
      if (!isDeleted)
      {
        return StatusCode(500, "An error occurred while deleting the company.");
      }

      return NoContent();
    }
  }
}
