
namespace ServerC.Models
{
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

  public class CreateTestRunInput
  {
    public string TestRunName { get; set; }
    public DateTime TestRunDate { get; set; }
    public int UserID { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int TestRunStatus { get; set; }
  }
}