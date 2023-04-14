
using ServerC.Services;
using ServerC.Helpers;

// ...

public class Startup
{
    // ...

    public void ConfigureServices(IServiceCollection services)
    {
        // ...
        services.AddTransient<ICompaniesService, CompaniesService>();

        services.AddTransient<IDatabaseHelper, DatabaseHelper>();

    }

    // ...
}
