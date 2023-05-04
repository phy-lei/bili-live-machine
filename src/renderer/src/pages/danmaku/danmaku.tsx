import React from 'react';
import styles from './styles/styles.module.less';
import DanHeader from './components/DanHeader/DanHeader';
import DanList from './components/DanList/DanList';

const danmaku = () => {
  return (
    <div className={styles['danmaku']}>
      <DanHeader></DanHeader>
      <DanList></DanList>
    </div>
  );
};

export default danmaku;
