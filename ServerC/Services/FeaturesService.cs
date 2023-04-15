using Dapper;
using ServerC.Interfaces;
using ServerC.Models;
using System.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ServerC.Services
{
    public class FeaturesService : IFeaturesService
    {
        private readonly IDatabaseHelper _databaseHelper;

        public FeaturesService(IDatabaseHelper databaseHelper)
        {
            _databaseHelper = databaseHelper;
        }

            public async Task<Feature> CreateFeatureAsync(Feature feature)
        {
            using (var connection = _databaseHelper.GetConnection())
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@FeatureName", feature.FeatureName);
                parameters.Add("@CompanyID", feature.CompanyID);

                Feature createdFeature = await connection.QuerySingleOrDefaultAsync<Feature>("dbo.CreateFeature", parameters, commandType: CommandType.StoredProcedure);
                return createdFeature;
            }
        }

        public async Task<IEnumerable<Feature>> GetAllFeaturesAsync()
        {
            using (var connection = _databaseHelper.GetConnection())
            {
                const string query = "EXEC GetAllFeatures";
                IEnumerable<Feature> features = await connection.QueryAsync<Feature>(query);
                return features;
            }
        }

        public async Task<IEnumerable<Feature>> GetFeaturesByCompanyAsync(int companyId)
        {
            using (var connection = _databaseHelper.GetConnection())
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CompanyID", companyId);

                IEnumerable<Feature> features = await connection.QueryAsync<Feature>("dbo.GetFeaturesByCompany", parameters, commandType: CommandType.StoredProcedure);
                return features;
            }
        }

        public async Task<Feature> UpdateFeatureAsync(Feature feature)
        {
            using (var connection = _databaseHelper.GetConnection())
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@FeatureID", feature.FeatureID, DbType.Int32);
                parameters.Add("@FeatureName", feature.FeatureName, DbType.String);
                parameters.Add("@CompanyID", feature.CompanyID, DbType.Int32);

                Feature updatedFeature = await connection.QuerySingleOrDefaultAsync<Feature>("dbo.UpdateFeature", parameters, commandType: CommandType.StoredProcedure);
                return updatedFeature;
            }
        }

public async Task<bool> DeleteFeatureAsync(int featureId)
{
    using (var connection = _databaseHelper.GetConnection())
    {
        // Delete all associated records from the TestRunCases table
        DynamicParameters deleteTestRunCasesParameters = new DynamicParameters();
        deleteTestRunCasesParameters.Add("@FeatureID", featureId, DbType.Int32);
        await connection.ExecuteAsync(
            "DELETE FROM TestRunCases WHERE TestCaseID IN (SELECT TestCaseID FROM TestCases WHERE FeatureID = @FeatureID)",
            deleteTestRunCasesParameters
        );

        // Delete all associated records from the TestCases table
        DynamicParameters deleteTestCasesParameters = new DynamicParameters();
        deleteTestCasesParameters.Add("@FeatureID", featureId, DbType.Int32);
        await connection.ExecuteAsync("DELETE FROM TestCases WHERE FeatureID = @FeatureID", deleteTestCasesParameters);

        // Delete the feature
        DynamicParameters deleteFeatureParameters = new DynamicParameters();
        deleteFeatureParameters.Add("@FeatureID", featureId, DbType.Int32);
        int affectedRows = await connection.ExecuteAsync("dbo.DeleteFeature", deleteFeatureParameters, commandType: CommandType.StoredProcedure);
        return affectedRows > 0;
    }
}


    }
}
