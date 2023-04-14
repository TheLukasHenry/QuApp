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

public class CompanyUser
{
    public int CompanyID { get; set; }
    public int UserID { get; set; }
    public Company Company { get; set; }
    public User User { get; set; }
}

public class Feature
{
    public int FeatureID { get; set; }
    public string FeatureName { get; set; }
    public int CompanyID { get; set; }
    public Company Company { get; set; }
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
    public Feature Feature { get; set; }
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
