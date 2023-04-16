using System.Collections.Generic;
using System.Threading.Tasks;
using ServerC.Models;

namespace ServerC.Interfaces
{
  public interface ICompanyUsersService
  {
    Task<CompanyUser> AddCompanyUserAsync(CompanyUser companyUser);
    Task<IEnumerable<CompanyUser>> GetCompanyUsersByCompanyIdAsync(int companyId);
    Task<IEnumerable<CompanyUser>> GetCompanyUsersByUserIdAsync(int userId);
    Task<bool> RemoveCompanyUserAsync(int companyId, int userId);
  }
}