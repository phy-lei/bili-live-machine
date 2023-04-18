import { useState } from 'react';
import styles from './styles.module.less';
import { IconStar } from '@arco-design/web-react/icon';

function Versions(): JSX.Element {
  const [versions] = useState(window.electron.process.versions);

  return (
    <ul className="versions">
      <li className={styles['electron-version']}>Electron v{versions.electron}</li>
      <li className="chrome-version">Chromium v{versions.chrome}</li>
      <li className="node-version">Node v{versions.node}</li>
      <li className="v8-version">V8 v{versions.v8}</li>
      <li>
        <IconStar style={{ fontSize: 24, marginRight: 20 }} />
      </li>
    </ul>
  );
}

export default Versions;
