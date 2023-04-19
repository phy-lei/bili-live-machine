import { useState, useRef, useEffect } from 'react';
import { Button } from '@arco-design/web-react';
import AtomTitle from '../AtomTitle/AtomTitle';
import { getLoginQrcodeApi } from '@renderer/apis/bilibili.api';

const AccountLogin = () => {
  const qrcodeEl = useRef<HTMLCanvasElement>(null);
  const [showQrcode, setShowQrcode] = useState(false);

  const save = () => {
    console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', 123);
    setShowQrcode(false);
  };

  const getLoginQrcode = async () => {
    const res = await getLoginQrcodeApi();
    console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', res);
  };

  const handleClick = () => {
    setShowQrcode(true);
    getLoginQrcode();
  };

  return (
    <AtomTitle title="哔哩哔哩账号" saveHandle={save}>
      <div>
        {showQrcode ? (
          <canvas ref={qrcodeEl}></canvas>
        ) : (
          <Button onClick={handleClick}>扫码登录</Button>
        )}
      </div>
    </AtomTitle>
  );
};

export default AccountLogin;
