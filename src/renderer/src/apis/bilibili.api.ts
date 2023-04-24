import $http from '@renderer/useRequest/useRequest';
import NodeFetch from 'node-fetch';
import { dataShowing } from '@renderer/utils/data.util';
import { QrcodeDto, pollLoginStatusDto, UserInfoDto } from './bilibili.api.dto';
import type { Config } from '@renderer/utils/config';
import { Message } from '@arco-design/web-react';

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

// 轮询检查是否扫码
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

export async function getUserInfoApi(cookie: NonNullable<Config['cookie']>): Promise<UserInfoDto> {
  const res: any = await NodeFetch(
    `https://api.bilibili.com/x/member/web/account?csrf=${dataShowing(cookie['bili_jct'])}`,
    {
      headers: {
        Cookie: dataShowing(cookie.text)
      }
    }
  ).then((r) => r.json());

  const res2 = await fetch(
    `https://api.bilibili.com/x/space/wbi/acc/info?mid=${dataShowing(
      cookie.DedeUserID
    )}&token=&platform=web&w_rid=dbb87a99db43d7e9222a05f6a9492276&wts=1675238196`
  ).then((r) => r.json());

  if (res.code === 0) {
    Message.success('获取用户信息成功');
  } else {
    Message.error(res?.message ?? '获取用户信息失败');
    throw Error('失败');
  }

  return {
    ...res.data,
    ...(res2?.code === 0 ? res2.data : {})
  };
}
