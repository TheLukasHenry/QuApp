
namespace ServerC.Models
{
  public class TestRunCase
  {
    public int TestRunCaseID { get; set; }
    public int TestRunID { get; set; }
    public int TestCaseID { get; set; }
    public int TestCaseStatus { get; set; }
    public string? TestCaseComment { get; set; }
  }
}