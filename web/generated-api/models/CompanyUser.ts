/* tslint:disable */
/* eslint-disable */
/**
 * ServerC
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface CompanyUser
 */
export interface CompanyUser {
    /**
     * 
     * @type {number}
     * @memberof CompanyUser
     */
    companyId?: number;
    /**
     * 
     * @type {number}
     * @memberof CompanyUser
     */
    userId?: number;
}

/**
 * Check if a given object implements the CompanyUser interface.
 */
export function instanceOfCompanyUser(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CompanyUserFromJSON(json: any): CompanyUser {
    return CompanyUserFromJSONTyped(json, false);
}

export function CompanyUserFromJSONTyped(json: any, ignoreDiscriminator: boolean): CompanyUser {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'companyId': !exists(json, 'companyId') ? undefined : json['companyId'],
        'userId': !exists(json, 'userId') ? undefined : json['userId'],
    };
}

export function CompanyUserToJSON(value?: CompanyUser | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'companyId': value.companyId,
        'userId': value.userId,
    };
}

