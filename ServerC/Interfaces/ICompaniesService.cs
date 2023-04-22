
using ServerC.Models;

namespace ServerC.Interfaces
{
  public interface ICompaniesService
  {
    Task<Company> CreateCompanyAsync(string companyName);
    Task<IEnumerable<Company>> GetAllCompaniesAsync();
    Task<Company> GetCompanyByIdAsync(int id);
    // Task<int> UpdateCompanyAsync(Company company);
    Task<Company> UpdateCompanyAsync(Company company);

    Task<bool> DeleteCompanyAsync(int companyId);


  }
}