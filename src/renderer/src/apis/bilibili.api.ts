import $http from '@renderer/useRequest/useRequest';

// 获取登录二维码
export async function getLoginQrcodeApi(): Promise<any> {
  const request = {
    method: 'get',
    url: '/x/passport-login/web/qrcode/generate?source=main-mini'
  } as const;
  try {
    const response = await $http(request);
    console.log('%c [ response ]', 'font-size:13px; background:pink; color:#bf2c9f;', response);
    if (response.code === 200) {
      return response.data;
    }
    throw response.msg;
  } catch (error) {
    console.log('%c [ error ]', 'font-size:13px; background:pink; color:#bf2c9f;', error);
  }
  return;
}
