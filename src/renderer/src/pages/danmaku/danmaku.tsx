import React from 'react';
import styles from './styles/styles.module.less';
import DanHeader from './components/DanHeader/DanHeader';

const danmaku = () => {
  return (
    <div className={styles['danmaku']}>
      <DanHeader></DanHeader>
    </div>
  );
};

export default danmaku;
