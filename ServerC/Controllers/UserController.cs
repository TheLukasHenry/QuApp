using Microsoft.AspNetCore.Mvc;
using ServerC.Interfaces;
using ServerC.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ServerC.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

      [HttpPost]
public async Task<IActionResult> CreateUser([FromBody] CreateUserInput input)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    User newUser = await _userService.CreateUserAsync(input);
    if (newUser == null)
        return StatusCode(500);

    return CreatedAtAction(nameof(GetUserById), new { id = newUser.UserID }, newUser);
}




        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            IEnumerable<User> users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

[HttpGet("{id}")]
public async Task<IActionResult> GetUserById(int id)
{
    User user = await _userService.GetUserByIdAsync(id);
    if (user == null)
        return NotFound();

    return Ok(user);
}


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != user.UserID)
                return BadRequest();

            User result = await _userService.UpdateUserAsync(user);
            if (result == null)
                return StatusCode(500);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            bool result = await _userService.DeleteUserAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpGet("email/{email}")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            User user = await _userService.GetUserByEmailAsync(email);
            if (user == null)
                return NotFound();

            return Ok(user);
        }
    }
}
