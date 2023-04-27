import { useState } from 'react';
import { getCurrentWindow } from '@electron/remote';
import { IconLoop, IconPushpin, IconLock, IconClose } from '@arco-design/web-react/icon';
import cs from '@renderer/utils/classNames';
import styles from './styles/styles.module.less';

const currentWindow = getCurrentWindow();

const DanHeader = () => {
  const [isOnTop, setIsOnTop] = useState(true);
  const [isLock, setIsLock] = useState(true);

  const basicArr = [
    {
      label: '看过：',
      value: 0
    },
    {
      label: '人气：',
      value: 0
    },
    {
      label: '粉丝：',
      value: 0
    }
  ];

  const onTopHandle = (flag: boolean) => {
    currentWindow.setAlwaysOnTop(flag);
    setIsOnTop(flag);
  };

  return (
    <div className={styles['DanHeader']}>
      <div className={styles['up-stat-info']}>
        {basicArr.map((item, index) => (
          <span className={styles['stat-item']} key={index}>
            <span className={styles['label']}>{item.label}</span>
            <span className={styles['value']}>{item.value}</span>
          </span>
        ))}
      </div>
      <div className={styles['operates']}>
        <div className={styles['btn']} title="清屏">
          <IconLoop />
        </div>
        <div
          className={cs([styles['btn'], isOnTop ? styles['is-active'] : ''])}
          title="置顶"
          onClick={() => onTopHandle(!isOnTop)}
        >
          <IconPushpin />
        </div>
        <div className={cs([styles['btn'], isLock ? styles['is-active'] : ''])} title="锁定">
          <IconLock />
        </div>
        <div className={styles['btn']} title="关闭">
          <IconClose />
        </div>
      </div>
    </div>
  );
};

export default DanHeader;
