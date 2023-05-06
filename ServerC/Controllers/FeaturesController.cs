using Microsoft.AspNetCore.Mvc;
using ServerC.Interfaces;
using ServerC.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ServerC.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class FeaturesController : ControllerBase
  {
    private readonly IFeaturesService _featuresService;

    public FeaturesController(IFeaturesService featuresService)
    {
      _featuresService = featuresService;
    }

    [HttpPost]
    public async Task<ActionResult<Feature>> CreateFeature([FromBody] CreateFeatureInput input)
    {

      if (string.IsNullOrEmpty(input.FeatureName) || input.CompanyID <= 0)
      {
        return BadRequest("FeatureName cannot be empty and CompanyID must be valid.");
      }

      Feature createdFeature = await _featuresService.CreateFeatureAsync(input);
      if (createdFeature == null)
      {
        return StatusCode(500, "An error occurred while creating the feature.");
      }

      return Ok(createdFeature);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Feature>>> GetAllFeatures()
    {
      IEnumerable<Feature> features = await _featuresService.GetAllFeaturesAsync();
      return Ok(features);
    }

    [HttpGet("{featureId}")]
    public ActionResult<Feature> GetFeaturesByCompany(string featureId)
    {
      return Ok(
       new Feature
       {
         FeatureID = 1,
         FeatureName = "Feature 1",
         CompanyID = 1
       });

    }

    [HttpGet("company/{companyId}")]
    public async Task<ActionResult<IEnumerable<Feature>>> GetFeaturesByCompany(int companyId)
    {
      IEnumerable<Feature> features = await _featuresService.GetFeaturesByCompanyAsync(companyId);
      return Ok(features);
    }

    [HttpPut]
    public async Task<ActionResult<Feature>> UpdateFeature([FromBody] Feature feature)
    {
      if (feature.FeatureID <= 0 || string.IsNullOrEmpty(feature.FeatureName) || feature.CompanyID <= 0)
      {
        return BadRequest("FeatureID, FeatureName, and CompanyID must be valid.");
      }

      Feature updatedFeature = await _featuresService.UpdateFeatureAsync(feature);
      if (updatedFeature == null)
      {
        return StatusCode(500, "An error occurred while updating the feature.");
      }

      return Ok(updatedFeature);
    }

    [HttpDelete("{featureId}")]
    public async Task<IActionResult> DeleteFeature(int featureId)
    {
      if (featureId <= 0)
      {
        return BadRequest("FeatureID must be valid.");
      }

      bool result = await _featuresService.DeleteFeatureAsync(featureId);
      if (!result)
      {
        return StatusCode(500, "An error occurred while deleting the feature.");
      }

      return NoContent();
    }
  }
}
