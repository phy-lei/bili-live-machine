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
  const handlers = {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver);
    },
    // 使用value set 不再使用function set策略进行设置
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', target, value);
      // 保存到本地存储
      saveConfig(target);
      return result;
    }
  };

  const initConfig = () => {
    config = new Proxy(getConfig(), handlers);
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
