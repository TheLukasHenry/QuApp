/* tslint:disable */
/* eslint-disable */
/**
 * ServerC
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime'
/**
 *
 * @export
 * @interface Feature
 */
export interface Feature {
  /**
   *
   * @type {number}
   * @memberof Feature
   */
  featureID?: number
  /**
   *
   * @type {string}
   * @memberof Feature
   */
  featureName: string
  /**
   *
   * @type {number}
   * @memberof Feature
   */
  companyID: number
}

/**
 * Check if a given object implements the Feature interface.
 */
export function instanceOfFeature(value: object): boolean {
  let isInstance = true
  isInstance = isInstance && 'featureName' in value
  isInstance = isInstance && 'companyID' in value

  return isInstance
}

export function FeatureFromJSON(json: any): Feature {
  return FeatureFromJSONTyped(json, false)
}

export function FeatureFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): Feature {
  if (json === undefined || json === null) {
    return json
  }
  return {
    featureID: !exists(json, 'featureID') ? undefined : json['featureID'],
    featureName: json['featureName'],
    companyID: json['companyID'],
  }
}

export function FeatureToJSON(value?: Feature | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    // 'featureID': value.featureID,
    featureName: 'RRRR',
    companyID: 1,
  }
}