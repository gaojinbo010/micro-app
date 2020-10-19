import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import type { CreateAxiosOptions, RequestOptions, Result } from './types';
import axios from 'axios';
import { isFunction } from '../../is';
import { AxiosCanceler } from './request.cance';
import { cloneDeep } from 'lodash-es';

export default class request {

    private axiosInstance: AxiosInstance;
    private options: CreateAxiosOptions;

    constructor(options: CreateAxiosOptions) {
        this.options = options;
        this.axiosInstance = axios.create(options);
        this.setupInterceptors();
    }

    private getTransform() {
        const { transform } = this.options;
        return transform;
    }


    // 请求方法
    request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        let conf: AxiosRequestConfig = cloneDeep(config);
        const transform = this.getTransform();

        const { requestOptions } = this.options;

        const opt: RequestOptions = Object.assign({}, requestOptions, options);

        const { beforeRequestHook, requestCatch, transformRequestData } = transform || {};
        if (beforeRequestHook && isFunction(beforeRequestHook)) {
            conf = beforeRequestHook(conf, opt);
        }
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .request<any, AxiosResponse<Result>>(conf)
                .then((res: AxiosResponse<Result>) => {
                    if (transformRequestData && isFunction(transformRequestData)) {
                        const ret = transformRequestData(res, opt);
                        ret !== '' ? resolve(ret) : reject(new Error('request error!'));
                        return;
                    }
                    resolve((res as unknown) as Promise<T>);
                })
                .catch((e: Error) => {
                    if (requestCatch && isFunction(requestCatch)) {
                        reject(requestCatch(e));
                        return;
                    }
                    reject(e);
                });
        });
    }

    //  拦截器配置
    private setupInterceptors() {
        const transform = this.getTransform();
        if (!transform) {
            return;
        }
        const {
            requestInterceptors,
            requestInterceptorsCatch,
            responseInterceptors,
            responseInterceptorsCatch,
        } = transform;

        const axiosCanceler = new AxiosCanceler();

        // 请求拦截器配置处理
        this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
            const { headers: { ignoreCancelToken } = { ignoreCancelToken: false } } = config;
            !ignoreCancelToken && axiosCanceler.addPending(config);
            if (requestInterceptors && isFunction(requestInterceptors)) {
                config = requestInterceptors(config);
            }
            return config;
        }, undefined);

        // 请求拦截器错误捕获
        requestInterceptorsCatch &&
            isFunction(requestInterceptorsCatch) &&
            this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

        // 响应结果拦截器处理
        this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
            res && axiosCanceler.removePending(res.config);
            if (responseInterceptors && isFunction(responseInterceptors)) {
                res = responseInterceptors(res);
            }
            return res;
        }, undefined);

        // 响应结果拦截器错误捕获
        responseInterceptorsCatch &&
            isFunction(responseInterceptorsCatch) &&
            this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch);
    }
}