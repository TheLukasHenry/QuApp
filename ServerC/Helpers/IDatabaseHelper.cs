// using System.Collections.Generic;
// using System.Threading.Tasks;
using ServerC.Models;

namespace ServerC.Helpers
{
    public interface IDatabaseHelper
    {
        Task<IEnumerable<Feature>> GetAllFeaturesAsync();
        Task<Company> CreateCompanyAsync(string companyName);
        Task<IEnumerable<Company>> GetAllCompaniesAsync();
        Task<Company> GetCompanyByIdAsync(int id);
    }
}
