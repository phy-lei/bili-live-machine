import $http from '@renderer/useRequest/useRequest';
import NodeFetch from 'node-fetch';
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

// export async function pollLoginStatusApi(qrcode_key: string): Promise<pollLoginStatusDto> {
//   const request = {
//     method: 'get',
//     baseURL: 'https://passport.bilibili.com',
//     url: `/x/passport-login/web/qrcode/poll?qrcode_key=${qrcode_key}&source=main_mini`
//   } as const;
//   try {
//     const response = await $http<pollLoginStatusDto>(request);
//     console.log('%c [ response ]', 'font-size:13px; background:pink; color:#bf2c9f;', response);
//     if (response.code === 0) {
//       return response.data;
//     }
//     throw response.msg;
//   } catch (error) {
//     console.log('%c [ error ]', 'font-size:13px; background:pink; color:#bf2c9f;', error);
//   }
//   return {} as pollLoginStatusDto;
// }

export async function pollLoginStatusApi(qrcode_key: string): Promise<pollLoginStatusDto> {
  const resp = await NodeFetch(
    `https://passport.bilibili.com/x/passport-login/web/qrcode/poll?qrcode_key=${qrcode_key}&source=main_mini`
  );
  const res: any = await resp.json();
  if (res.code === 0 && res.data) {
    const cookieText = resp.headers.get('set-cookie');
    if (cookieText) {
      res.data.cookie = cookieText
        .split(/\s*[,;]\s*/)
        .filter((it) => it.includes('='))
        .reduce((map, cur) => {
          const [key, val] = cur.split('=');
          if (!['Path', 'Domain', 'Expires'].includes(key)) {
            map[key] = val;
          }
          return map;
        }, {} as Record<string, string>);
    }
    return res.data as pollLoginStatusDto;
  }
  return {} as pollLoginStatusDto;
}
