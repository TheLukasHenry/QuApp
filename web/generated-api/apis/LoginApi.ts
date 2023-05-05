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
  LoginRequest,
} from '../models';
import {
    LoginRequestFromJSON,
    LoginRequestToJSON,
} from '../models';

export interface LoginPostRequest {
    loginRequest?: LoginRequest;
}

/**
 * 
 */
export class LoginApi extends runtime.BaseAPI {

    /**
     */
    async loginPostRaw(requestParameters: LoginPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: LoginRequestToJSON(requestParameters.loginRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async loginPost(requestParameters: LoginPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.loginPostRaw(requestParameters, initOverrides);
    }

}
