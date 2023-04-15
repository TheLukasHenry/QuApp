using ServerC.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ServerC.Interfaces
{
    public interface IFeaturesService
    {
        Task<Feature> CreateFeatureAsync(Feature feature);
        Task<IEnumerable<Feature>> GetAllFeaturesAsync();
        Task<IEnumerable<Feature>> GetFeaturesByCompanyAsync(int companyId);
        Task<Feature> UpdateFeatureAsync(Feature feature);
        Task<bool> DeleteFeatureAsync(int featureId);
    }
}
