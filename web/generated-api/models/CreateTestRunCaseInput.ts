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
 * @interface CreateTestRunCaseInput
 */
export interface CreateTestRunCaseInput {
    /**
     * 
     * @type {number}
     * @memberof CreateTestRunCaseInput
     */
    testRunId?: number;
    /**
     * 
     * @type {number}
     * @memberof CreateTestRunCaseInput
     */
    testCaseId?: number;
    /**
     * 
     * @type {number}
     * @memberof CreateTestRunCaseInput
     */
    testCaseStatus?: number;
    /**
     * 
     * @type {string}
     * @memberof CreateTestRunCaseInput
     */
    testCaseComment?: string | null;
}

/**
 * Check if a given object implements the CreateTestRunCaseInput interface.
 */
export function instanceOfCreateTestRunCaseInput(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CreateTestRunCaseInputFromJSON(json: any): CreateTestRunCaseInput {
    return CreateTestRunCaseInputFromJSONTyped(json, false);
}

export function CreateTestRunCaseInputFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateTestRunCaseInput {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'testRunId': !exists(json, 'testRunId') ? undefined : json['testRunId'],
        'testCaseId': !exists(json, 'testCaseId') ? undefined : json['testCaseId'],
        'testCaseStatus': !exists(json, 'testCaseStatus') ? undefined : json['testCaseStatus'],
        'testCaseComment': !exists(json, 'testCaseComment') ? undefined : json['testCaseComment'],
    };
}

export function CreateTestRunCaseInputToJSON(value?: CreateTestRunCaseInput | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'testRunId': value.testRunId,
        'testCaseId': value.testCaseId,
        'testCaseStatus': value.testCaseStatus,
        'testCaseComment': value.testCaseComment,
    };
}
