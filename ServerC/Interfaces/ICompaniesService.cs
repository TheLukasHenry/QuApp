
using ServerC.Models;

namespace ServerC.Interfaces
{
  public interface ICompaniesService
  {
    Task<Company> CreateCompanyAsync(string companyName);
    Task<IEnumerable<Company>> GetAllCompaniesAsync();
    Task<Company> GetCompanyByIdAsync(int id);
    Task<Company> UpdateCompanyAsync(int companyId, string companyName);
    Task<bool> DeleteCompanyAsync(int companyId);


  }
}