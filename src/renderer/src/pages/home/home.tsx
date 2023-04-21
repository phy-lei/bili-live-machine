import { Tabs } from '@arco-design/web-react';
import { IconSettings, IconUser, IconList } from '@arco-design/web-react/icon';
// import { useNavigate } from 'react-router-dom';
import BaseSetting from './components/BaseSetting/BaseSetting';
import AccountLogin from './components/AccountLogin/AccountLogin';
import styles from './styles/styles.module.less';

const TabPane = Tabs.TabPane;

const Home = () => {
  // const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate('/danmu');
  // };

  return (
    <div className={styles['settings']}>
      <Tabs className={styles['settings-tabs']} tabPosition="left" type="capsule">
        <TabPane
          key="tab1"
          title={
            <span>
              <IconSettings /> 基础
            </span>
          }
        >
          <BaseSetting />
        </TabPane>
        <TabPane
          key="tab2"
          title={
            <span>
              <IconUser /> 账号
            </span>
          }
        >
          <AccountLogin />
        </TabPane>
        <TabPane
          key="tab3"
          title={
            <span>
              <IconList />
              弹幕
            </span>
          }
        >
          445
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Home;
