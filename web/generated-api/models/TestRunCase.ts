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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface TestRunCase
 */
export interface TestRunCase {
    /**
     * 
     * @type {number}
     * @memberof TestRunCase
     */
    testRunCaseID?: number;
    /**
     * 
     * @type {number}
     * @memberof TestRunCase
     */
    testRunID?: number;
    /**
     * 
     * @type {number}
     * @memberof TestRunCase
     */
    testCaseID?: number;
    /**
     * 
     * @type {number}
     * @memberof TestRunCase
     */
    testCaseStatus?: number;
    /**
     * 
     * @type {string}
     * @memberof TestRunCase
     */
    testCaseComment?: string | null;
}

/**
 * Check if a given object implements the TestRunCase interface.
 */
export function instanceOfTestRunCase(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TestRunCaseFromJSON(json: any): TestRunCase {
    return TestRunCaseFromJSONTyped(json, false);
}

export function TestRunCaseFromJSONTyped(json: any, ignoreDiscriminator: boolean): TestRunCase {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'testRunCaseID': !exists(json, 'testRunCaseID') ? undefined : json['testRunCaseID'],
        'testRunID': !exists(json, 'testRunID') ? undefined : json['testRunID'],
        'testCaseID': !exists(json, 'testCaseID') ? undefined : json['testCaseID'],
        'testCaseStatus': !exists(json, 'testCaseStatus') ? undefined : json['testCaseStatus'],
        'testCaseComment': !exists(json, 'testCaseComment') ? undefined : json['testCaseComment'],
    };
}

export function TestRunCaseToJSON(value?: TestRunCase | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'testRunCaseID': value.testRunCaseID,
        'testRunID': value.testRunID,
        'testCaseID': value.testCaseID,
        'testCaseStatus': value.testCaseStatus,
        'testCaseComment': value.testCaseComment,
    };
}
