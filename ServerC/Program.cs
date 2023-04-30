using Microsoft.AspNetCore.Identity;
using ServerC.Services;
using ServerC.Interfaces;
using ServerC.Models;
using Microsoft.OpenApi.Models;

// stored procedures
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IDatabaseHelper, DatabaseHelper>();
builder.Services.AddScoped<ICompaniesService, CompaniesService>();
builder.Services.AddScoped<IFeaturesService, FeaturesService>();
builder.Services.AddScoped<ITestCasesService, TestCasesService>();
builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddScoped<ITestRunsService, TestRunsService>();
builder.Services.AddScoped<ICompanyUsersService, CompanyUsersService>();
builder.Services.AddScoped<ITestRunCasesService, TestRunCasesService>();
// add cors
builder.Services.AddCors(options =>
{
  options.AddDefaultPolicy(
      builder =>
      {
        builder.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();

      });
});


// Register the PasswordHasher<User>
builder.Services.AddSingleton<PasswordHasher<User>>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// builder.Services.AddSwaggerGen(c =>
// {
//   c.SwaggerDoc("v1", new OpenApiInfo { Title = "ServerC", Version = "1.0" });

//   // Add this line to enable operationIds based on the method names
//   c.CustomOperationIds(e => $"{e.ActionDescriptor.RouteValues["controller"]}_{e.HttpMethod}_{e.ActionDescriptor.RouteValues["action"]}");
// });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
