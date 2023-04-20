import $http from '@renderer/useRequest/useRequest';
import { QrcodeDto, pollLoginStatusDto } from './bilibili.api.dto';

// 获取登录二维码
export async function getLoginQrcodeApi(): Promise<QrcodeDto> {
  const request = {
    method: 'get',
    baseURL: 'https://passport.bilibili.com',
    url: '/x/passport-login/web/qrcode/generate?source=main-mini'
  } as const;
  try {
    const response = await $http<QrcodeDto>(request);
    console.log('%c [ response ]', 'font-size:13px; background:pink; color:#bf2c9f;', response);
    if (response.code === 0) {
      return response.data;
    }
    throw response.msg;
  } catch (error) {
    console.log('%c [ error ]', 'font-size:13px; background:pink; color:#bf2c9f;', error);
  }
  return {} as QrcodeDto;
}

export async function pollLoginStatusApi(qrcode_key: string): Promise<pollLoginStatusDto> {
  const request = {
    method: 'get',
    baseURL: 'https://passport.bilibili.com',
    url: `/x/passport-login/web/qrcode/poll?qrcode_key=${qrcode_key}&source=main_mini`
  } as const;
  try {
    const response = await $http<pollLoginStatusDto>(request);
    console.log('%c [ response ]', 'font-size:13px; background:pink; color:#bf2c9f;', response);
    if (response.code === 0) {
      return response.data;
    }
    throw response.msg;
  } catch (error) {
    console.log('%c [ error ]', 'font-size:13px; background:pink; color:#bf2c9f;', error);
  }
  return {} as pollLoginStatusDto;
}
