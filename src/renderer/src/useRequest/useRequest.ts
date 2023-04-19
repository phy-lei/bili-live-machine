import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { baseURL } from './baseUrl';
import { Message } from '@arco-design/web-react';

interface CommonResponse<T = unknown> {
  code: number;
  msg: string;
  data: T;
  page: T;
}

export default <T = unknown>(options: AxiosRequestConfig): Promise<CommonResponse<T>> =>
  new Promise((resolve, reject) => {
    // 创建一个axios实例
    const obj = {
      baseURL: options.baseURL ? options.baseURL : baseURL,
      withCredentials: true,
      headers: options.headers ? options.headers : { 'Content-Type': 'application/json' },
      transformResponse: [],
      ...options,
      url: options.url,
      timeout: 3000
    };
    const instance: AxiosInstance = axios.create(obj);

    //  响应头拦截器
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        try {
          const responseBody = JSON.parse(response.request.response);
          resolve(responseBody);
          // 未登录或登录失效，跳转登录页面
          // if ('code' in responseBody && responseBody.code === 401) window.location.href = '/#/404';
        } catch (e: any) {
          Message.error(e);
        }
        return response;
      },

      (error: AxiosError) => {
        console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', error);
        Message.error(error.message);
      }
    );
    // 发送请求
    instance.request<unknown, T>(obj);
  });
