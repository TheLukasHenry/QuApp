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
    }
}
