using System.ComponentModel.DataAnnotations;

namespace ServerC.Models
{



  public class User
  {
    public int UserID { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public byte[] PasswordHash { get; set; }
  }

  public class CreateUserInput
  {
    [Required(ErrorMessage = "The UserName field is required.")]
    [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 3)]
    public string UserName { get; set; }

    [Required(ErrorMessage = "The Email field is required.")]
    [EmailAddress(ErrorMessage = "The Email field is not a valid email address.")]
    public string Email { get; set; }

    [Required(ErrorMessage = "The Password field is required.")]
    public string Password { get; set; }

  }

  // write UpdateUserInput class here extending CreateUserInput + adding UserID property
  public class UpdateUserInput : CreateUserInput
  {
    public int UserID { get; set; }

  }

}