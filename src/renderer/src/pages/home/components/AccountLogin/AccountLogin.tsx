import { useState, useRef } from 'react';
import { Button, Avatar } from '@arco-design/web-react';
import AtomTitle from '../AtomTitle/AtomTitle';
import { getLoginQrcodeApi, pollLoginStatusApi, getUserInfoApi } from '@renderer/apis/bilibili.api';
import qrcode from 'qrcode';
import styles from './styles/styles.module.less';
import { dataMarking } from '@renderer/utils/data.util';
import useConfig from '@renderer/utils/config';

const AccountLogin = () => {
  const { config } = useConfig();

  const qrcodeEl = useRef<HTMLCanvasElement>(null);
  const [showQrcode, setShowQrcode] = useState(false);

  const [isNeedRefresh, setIsNeedRefresh] = useState(false);

  const [accountInfo, setAccountInfo] = useState<Awaited<ReturnType<typeof pollLoginStatusApi>>>();

  const [userInfo, setUserInfo] = useState<Awaited<ReturnType<typeof getUserInfoApi>>>();

  const save = async () => {
    // setShowQrcode(false);
    const filePath = await window.api.test('test');
    console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', filePath);
  };

  const getUserInfo = async (cookie) => {
    const res = await getUserInfoApi(cookie);
    setUserInfo(res);
  };

  const getLoginQrcode = async () => {
    const res = await getLoginQrcodeApi();
    if (res) {
      qrcode.toCanvas(qrcodeEl.current, res.url, {
        width: 200
      });
      pollLoginStatus(res.qrcode_key);
    }
  };

  let timer: any = null;
  const pollLoginStatus = async (qrcode_key: string) => {
    const res = await pollLoginStatusApi(qrcode_key);

    if (res.code === 86101) {
      setAccountInfo(undefined);
    } else if (res.code === 0) {
      const cookie = {
        SESSDATA: dataMarking(res.cookie['SESSDATA']),
        sid: dataMarking(res.cookie['sid']),
        bili_jct: dataMarking(res.cookie['bili_jct']),
        DedeUserID: dataMarking(res.cookie['DedeUserID']),
        DedeUserID__ckMd5: dataMarking(res.cookie['DedeUserID__ckMd5']),
        text: dataMarking(
          Object.keys(res.cookie)
            .map((key) => key + '=' + res.cookie[key])
            .join(';')
        )
      };
      config.cookie = cookie;

      clearTimeout(timer);
      setShowQrcode(false);
      setAccountInfo(res);

      getUserInfo(cookie);

      return;
    }

    if (res.code !== 86038) {
      timer = setTimeout(() => {
        pollLoginStatus(qrcode_key);
      }, 2000);
    } else {
      setIsNeedRefresh(true);
      setAccountInfo(res);
    }
  };

  const handleClick = () => {
    setShowQrcode(true);
    getLoginQrcode();
  };

  const handleLogout = async () => {
    config.cookie = undefined;
    setAccountInfo(undefined);
    setShowQrcode(false);
  };

  return (
    <AtomTitle title="哔哩哔哩账号" saveHandle={save}>
      {!userInfo && (
        <div>
          {/* 注意不要写成行内组件 会触发rerender
 若要这么做 得特殊处理成外部组件*/}
          {showQrcode ? (
            <div className={styles['qrcode-box']}>
              <canvas ref={qrcodeEl}></canvas>
              {accountInfo && (
                <div className={styles['qrcode-text']}>
                  {isNeedRefresh && <Button onClick={handleClick}>重新扫码</Button>}
                  <span>{accountInfo.message}</span>
                </div>
              )}
            </div>
          ) : (
            <Button onClick={handleClick}>扫码登录</Button>
          )}
        </div>
      )}

      <div>
        {userInfo && (
          <div>
            <Avatar>
              <img alt="avatar" src={userInfo.face} />
            </Avatar>
            <span style={{ marginLeft: '12px' }}>
              {userInfo.uname} ({userInfo?.mid})
            </span>
            <Button type="text" onClick={handleLogout}>
              退出
            </Button>
          </div>
        )}

        <div style={{ marginTop: '12px' }}>
          <Button>测试弹幕</Button>
          <Button style={{ marginLeft: '12px' }} onClick={() => getUserInfo(config.cookie)}>
            获取用户信息
          </Button>
        </div>
      </div>
    </AtomTitle>
  );
};

export default AccountLogin;
