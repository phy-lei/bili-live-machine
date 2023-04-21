import { useState, useRef } from 'react';
import { Button } from '@arco-design/web-react';
import AtomTitle from '../AtomTitle/AtomTitle';
import { getLoginQrcodeApi, pollLoginStatusApi } from '@renderer/apis/bilibili.api';
import qrcode from 'qrcode';
import styles from './styles/styles.module.less';
import useEvents from '@ipc/useEvents';

const AccountLogin = () => {
  const { addEvent } = useEvents();
  const qrcodeEl = useRef<HTMLCanvasElement>(null);
  const [showQrcode, setShowQrcode] = useState(false);

  const [isNeedRefresh, setIsNeedRefresh] = useState(false);

  const [accountInfo, setAccountInfo] = useState<Awaited<ReturnType<typeof pollLoginStatusApi>>>();

  const save = async () => {
    console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', 123);
    // setShowQrcode(false);
    const filePath = await (window as any).api.openFile();
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
    console.log(
      '%c [ pollLoginStatusApi ]',
      'font-size:13px; background:pink; color:#bf2c9f;',
      res
    );
    if (res.code === 86101) {
      setAccountInfo(undefined);
    } else if (res.code === 0) {
      // todo 保存cookie 设置用户信息
      clearTimeout(timer);
      setAccountInfo(res);
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
    addEvent('hello', () => {
      console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', 123123);
    });
    return;
    setShowQrcode(true);
    getLoginQrcode();
  };

  // const QrcodeBox = () => {
  //   console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', 'rerender');
  //   return (
  //     <div className={styles['qrcode-box']}>
  //       <canvas ref={qrcodeEl}></canvas>
  //       {accountInfo && (
  //         <div className={styles['qrcode-text']}>
  //           {isNeedRefresh && <Button onClick={handleClick}>重新扫码</Button>}
  //           <span>{accountInfo.message}</span>
  //         </div>
  //       )}
  //     </div>
  //   );
  // };

  return (
    <AtomTitle title="哔哩哔哩账号" saveHandle={save}>
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
    </AtomTitle>
  );
};

export default AccountLogin;
