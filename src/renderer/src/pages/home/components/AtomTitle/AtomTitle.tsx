import React, { PropsWithChildren } from 'react';
import { Button } from '@arco-design/web-react';
import styles from './styles/styles.module.less';

interface Props {
  title: string | React.ReactNode;
  saveHandle?: () => void;
}

const AtomTitle = (props: PropsWithChildren<Props>) => {
  const { title, children, saveHandle } = props;

  return (
    <div className={styles['AtomTitle']}>
      <div className={styles['header']}>
        <h2>{title}</h2>
      </div>
      <div>{children && children}</div>
      <div className={styles['footer']}>
        <Button type="primary" onClick={saveHandle}>
          保存
        </Button>
      </div>
    </div>
  );
};

export default AtomTitle;
