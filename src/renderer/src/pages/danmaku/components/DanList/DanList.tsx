import { useState } from 'react';
import { IconNotification } from '@arco-design/web-react/icon';
import cs from '@renderer/utils/classNames';
import styles from './styles/styles.module.less';

const DanList = () => {
  const [isToBottom, setIsToBottom] = useState(false);
  const [unreadTotal, setUnreadTotal] = useState(0);

  return (
    <div className={styles['danmaku-list']}>
      <div className={styles['danmaku-list__inner']}>123</div>
      <div
        className={cs([styles['to-bottom'], isToBottom ? styles['is-hidden'] : ''])}
        title="到底部"
      >
        <span className="unread">{unreadTotal > 99 ? '∞' : unreadTotal}</span>
        <IconNotification />
      </div>
    </div>
  );
};

export default DanList;
