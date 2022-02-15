import { AxiosRequestConfig } from 'axios';
import axios from '@/services/axios';

export const AUTHORIZATION_KEY = 'X-AUTH-TOKEN';
export const SESSION_KEY = 'sessionId';
export const NORMAL_CODES = [200];

export const LOGIN_EXPIRED_CODES = [401];

export const NO_AUTH_CODES = [403];

axios.interceptors.request.use(
  config => {
    const conf: AxiosRequestConfig = { ...config };
    // const sessionId = sessionStorage.getItem(SESSION_KEY) || ''
    // conf.headers[AUTHORIZATION_KEY] = baseConfig.authToken
    // conf.headers[SESSION_KEY] = sessionId
    return conf;
  },
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  async response => {
    const { config } = response;
    const silent: boolean = (config as AxiosRequestConfig & { silent?: boolean }).silent || false;
    const { data, status } = response;
    const { code, message, data: res } = data;
    const composedCode = +(code ?? status);
    if (LOGIN_EXPIRED_CODES.indexOf(composedCode) >= 0) {
      message({
        type: 'error',
        message: '登录已失效，请重新登录',
      });
      return Promise.reject(message);
    }
    if (NO_AUTH_CODES.indexOf(composedCode) >= 0) {
      message.error({
        message: '无权限访问',
      });
      return Promise.reject(response);
    }
    if (NORMAL_CODES.indexOf(composedCode) < 0) {
      message.error({
        message,
      });
      return Promise.reject(message);
    }
    return res;
  },
  async error => {
    const {
      data: { message: errMsg = '' },
    } = error.response;
    console.log('err', error.response);
    const message = errMsg.includes('错误编码') ? errMsg.split(';错误编码')[0] : errMsg;
    message({
      type: 'error',
      message: message || '系统错误，请联系管理员。',
      customClass: 'message-override',
      duration: 5000,
    });
    return Promise.reject(error);
  },
);
