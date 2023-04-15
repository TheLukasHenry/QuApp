using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerC.Models
{

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
}