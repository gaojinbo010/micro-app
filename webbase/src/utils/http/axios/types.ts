import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export abstract class AxiosTransform {
    /**
     * @description: 请求之前处理配置
     * @description: Process configuration before request
     */
    beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

    /**
     * @description: 请求成功处理
     */
    transformRequestData?: (res: AxiosResponse<Result>, options: RequestOptions) => any;

    /**
     * @description: 请求失败处理
     */
    requestCatch?: (e: Error) => Promise<any>;

    /**
     * @description: 请求之前的拦截器
     */
    requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;

    /**
     * @description: 请求之后的拦截器
     */
    responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

    /**
     * @description: 请求之前的拦截器错误处理
     */
    requestInterceptorsCatch?: (error: Error) => void;

    /**
     * @description: 请求之后的拦截器错误处理
     */
    responseInterceptorsCatch?: (error: Error) => void;
}

export interface RequestOptions {
    // 请求参数拼接到url
    joinParamsToUrl?: boolean;
    // 格式化请求参数时间
    formatDate?: boolean;
    //  是否处理请求结果
    isTransformRequestResult?: boolean;
    // 是否加入url
    joinPrefix?: boolean;
    // 接口地址， 不填则使用默认apiUrl
    apiUrl?: string;
    // 错误消息提示类型
    errorMessageMode?: 'none' | 'modal';
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
    prefixUrl?: string;
    transform?: AxiosTransform;
    requestOptions?: RequestOptions;
}

export interface Result<T = any> {
    code: number;
    type: 'success' | 'error' | 'warning';
    message: string;
    result: T;
}