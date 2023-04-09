using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ServerC.Helpers;

namespace ServerC.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ExampleController : ControllerBase
  {
    private readonly DatabaseHelper _databaseHelper;

    public ExampleController(DatabaseHelper databaseHelper)
    {
      _databaseHelper = databaseHelper;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
      // Use the _databaseHelper to interact with the database, e.g.:
      var yourModels = await _databaseHelper.GetAllFeaturesAsync();
      return Ok(yourModels);

      // Just an example for now:
      using (var connection = _databaseHelper.GetConnection())
      {
        await connection.OpenAsync();
        return Ok("Connection to the database was successful!");
      }
    }
  }
}
