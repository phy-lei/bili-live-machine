import { isObject } from './is';

export interface Config {
  uname?: string;
  roomId?: number;
  basic?: {
    uid?: number;
    msgsLimit?: number; // 消息列表上限，超出将截取掉旧消息
    autoClearEnter?: boolean; // 是否自动清除入场消息
    clearEnterBefore?: number; // 清除多少秒之前的入场消息
    comboSameGift?: boolean; // 是否合并相同礼物
    comboGiftIn?: number; // 合并多少秒内的礼物
    broadcast?: boolean; // 是否语音播报
    broadcaseVoiceOrigin?: 'SYS' | 'TENCENT'; // 语音播报声音源
    broadcaseVoiceTencentTTS?: {
      secretId: string;
      secretKey: string;
    }; // 语音播报腾讯云 TTS 配置
    headerStats?: { key: string; label: string; show: boolean }[]; // 弹幕窗口头部状态显示
  };
  music?: {
    enable?: boolean; // 是否开启点歌
    defaultListId?: number; // 默认歌单 id
    cutLimit?: number; // 切歌上限
    listLimit?: number; // 歌单上限
    blackList?: { id: number; name: string }[]; // 黑名单歌曲列表
  };
  // 历史记录
  history?: {
    uidList?: { id: number; name?: string }[];
  };
  cookie?: {
    SESSDATA: string;
    bili_jct: string;
    DedeUserID: string;
    DedeUserID__ckMd5: string;
    sid: string;
    text: string;
  };
}

let config: Config = {} as Config;

export default () => {
  function reactive(obj: Record<any, any>) {
    return new Proxy(obj, {
      get(target, key, receiver) {
        const value = Reflect.get(target, key, receiver);

        // 如果当前value是对象 则需要递归proxy 否则对于二层以上对象 代理将失败
        // 比如config.basic.uid = xxx basic下的uid会触发不了拦截
        if (isObject(value)) {
          return reactive(value);
        }
        return value;
      },
      // 使用value set 不再使用function set策略进行设置
      set(target, key, value, receiver) {
        const result = Reflect.set(target, key, value, receiver);

        // 保存到本地存储
        saveConfig(config);
        return result;
      }
    });
  }

  const initConfig = () => {
    config = reactive(getConfig());
  };

  const getConfig = (key?: string) => {
    const config = window.localStorage.getItem('config');
    const parseConfig = JSON.parse(config || '{}');

    return key ? parseConfig[key] : parseConfig;
  };

  const saveConfig = (config: Config) => {
    window.localStorage.setItem('config', JSON.stringify(config));
  };

  return {
    config,
    initConfig
  };
};
