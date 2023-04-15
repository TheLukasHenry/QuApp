
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerC.Models
{
public class Company
{
    public int CompanyID { get; set; }
    public string CompanyName { get; set; }
}

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

    // [Required(ErrorMessage = "The PasswordHashBase64 field is required.")]
    // public string PasswordHashBase64 { get; set; }
    // public string PasswordHash { get; set; }

}


public class CompanyUser
{
    public int CompanyID { get; set; }
    public int UserID { get; set; }
    public Company Company { get; set; }
    public User User { get; set; }
}

    public class Feature
    {
        [Key]
        public int FeatureID { get; set; }

        [Required]
        [StringLength(50)]
        public string FeatureName { get; set; }

        [Required]
        public int CompanyID { get; set; }

        // [ForeignKey("CompanyID")]
        // public virtual Company Company { get; set; }
    }

public class Status
{
    public int StatusID { get; set; }
    public string StatusName { get; set; }
}

public class TestRun
{
    public int TestRunID { get; set; }
    public string TestRunName { get; set; }
    public DateTime TestRunDate { get; set; }
    public int UserID { get; set; }
    public User User { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int TestRunStatus { get; set; }
    public Status Status { get; set; }
}

public class TestCase
{
    public int TestCaseID { get; set; }
    public int FeatureID { get; set; }
    // public Feature Feature { get; set; }
    public string TestCaseName { get; set; }
    public int TestCaseOrder { get; set; }
}

public class TestRunCase
{
    public int TestRunCaseID { get; set; }
    public int TestRunID { get; set; }
    public TestRun TestRun { get; set; }
    public int TestCaseID { get; set; }
    public TestCase TestCase { get; set; }
    public int TestCaseStatus { get; set; }
    public Status Status { get; set; }
    public string TestCaseComment { get; set; }
}


}
