
using ServerC.Models;

namespace ServerC.Services
{
    public interface ICompaniesService
    {
                Task<Company> CreateCompanyAsync(string companyName);
        Task<IEnumerable<Company>> GetAllCompaniesAsync();
        Task<Company> GetCompanyByIdAsync(int id);


    }
}