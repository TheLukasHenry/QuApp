
namespace ServerC.Models
{
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