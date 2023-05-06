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


import * as runtime from '../runtime';
import type {
  CreateTestRunInput,
  TestRun,
} from '../models';
import {
    CreateTestRunInputFromJSON,
    CreateTestRunInputToJSON,
    TestRunFromJSON,
    TestRunToJSON,
} from '../models';

export interface TestRunsPostRequest {
    createTestRunInput?: CreateTestRunInput;
}

export interface TestRunsTestRunIdDeleteRequest {
    testRunId: number;
}

export interface TestRunsTestRunIdGetRequest {
    testRunId: number;
}

export interface TestRunsTestRunIdPutRequest {
    testRunId: number;
    createTestRunInput?: CreateTestRunInput;
}

/**
 * 
 */
export class TestRunsApi extends runtime.BaseAPI {

    /**
     */
    async testRunsGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<TestRun>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/TestRuns`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TestRunFromJSON));
    }

    /**
     */
    async testRunsGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<TestRun>> {
        const response = await this.testRunsGetRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async testRunsPostRaw(requestParameters: TestRunsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TestRun>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/TestRuns`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateTestRunInputToJSON(requestParameters.createTestRunInput),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TestRunFromJSON(jsonValue));
    }

    /**
     */
    async testRunsPost(requestParameters: TestRunsPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TestRun> {
        const response = await this.testRunsPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async testRunsTestRunIdDeleteRaw(requestParameters: TestRunsTestRunIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.testRunId === null || requestParameters.testRunId === undefined) {
            throw new runtime.RequiredError('testRunId','Required parameter requestParameters.testRunId was null or undefined when calling testRunsTestRunIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/TestRuns/{testRunId}`.replace(`{${"testRunId"}}`, encodeURIComponent(String(requestParameters.testRunId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async testRunsTestRunIdDelete(requestParameters: TestRunsTestRunIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.testRunsTestRunIdDeleteRaw(requestParameters, initOverrides);
    }

    /**
     */
    async testRunsTestRunIdGetRaw(requestParameters: TestRunsTestRunIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TestRun>> {
        if (requestParameters.testRunId === null || requestParameters.testRunId === undefined) {
            throw new runtime.RequiredError('testRunId','Required parameter requestParameters.testRunId was null or undefined when calling testRunsTestRunIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/TestRuns/{testRunId}`.replace(`{${"testRunId"}}`, encodeURIComponent(String(requestParameters.testRunId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TestRunFromJSON(jsonValue));
    }

    /**
     */
    async testRunsTestRunIdGet(requestParameters: TestRunsTestRunIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TestRun> {
        const response = await this.testRunsTestRunIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async testRunsTestRunIdPutRaw(requestParameters: TestRunsTestRunIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TestRun>> {
        if (requestParameters.testRunId === null || requestParameters.testRunId === undefined) {
            throw new runtime.RequiredError('testRunId','Required parameter requestParameters.testRunId was null or undefined when calling testRunsTestRunIdPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/TestRuns/{testRunId}`.replace(`{${"testRunId"}}`, encodeURIComponent(String(requestParameters.testRunId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: CreateTestRunInputToJSON(requestParameters.createTestRunInput),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TestRunFromJSON(jsonValue));
    }

    /**
     */
    async testRunsTestRunIdPut(requestParameters: TestRunsTestRunIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TestRun> {
        const response = await this.testRunsTestRunIdPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}