using ServerC.Models;

public interface ICompanyRepository
{
    Task<IEnumerable<Company>> GetAllAsync();
    Task<Company> GetByIdAsync(int id);
    Task AddAsync(Company company);
    Task AddCompany(Company company);
    Task UpdateAsync(Company company);
    Task DeleteAsync(int id);
}
public interface IFeatureRepository
{
    Task<IEnumerable<Feature>> GetAllAsync();
    Task<Feature> GetByIdAsync(int id);
    Task AddAsync(Feature feature);
    Task UpdateAsync(Feature feature);
    Task DeleteAsync(int id);
    Task<IEnumerable<Feature>> GetFeaturesByCompanyIdAsync(int companyId);
}
public interface IStatusRepository
{
    Task<IEnumerable<Status>> GetAllAsync();
    Task<Status> GetByIdAsync(int id);
    Task AddAsync(Status status);
    Task UpdateAsync(Status status);
    Task DeleteAsync(int id);
}
public interface ITestCaseRepository
{
    Task<IEnumerable<TestCase>> GetAllAsync();
    Task<TestCase> GetByIdAsync(int id);
    Task AddAsync(TestCase testCase);
    Task UpdateAsync(TestCase testCase);
    Task DeleteAsync(int id);
    Task<IEnumerable<TestCase>> GetTestCasesByFeatureIdAsync(int featureId);
}
public interface ITestRunCaseRepository
{
    Task<IEnumerable<TestRunCase>> GetAllAsync();
    Task<TestRunCase> GetByIdAsync(int id);
    Task AddAsync(TestRunCase testRunCase);
    Task UpdateAsync(TestRunCase testRunCase);
    Task DeleteAsync(int id);
    Task<IEnumerable<TestRunCase>> GetTestRunCasesByTestRunIdAsync(int testRunId);
}
public interface IUserRepository
{
    Task<IEnumerable<User>> GetAllAsync();
    Task<User> GetByIdAsync(int id);
    Task AddAsync(User user);
    Task UpdateAsync(User user);
    Task DeleteAsync(int id);
    Task<User> GetUserByEmailAsync(string email);
}
