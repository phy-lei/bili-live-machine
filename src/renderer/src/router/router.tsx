import { lazy, Suspense } from 'react';

const Versions = lazy(() => import('../components/Versions'));
const Home = lazy(() => import('@renderer/pages/home/home'));

function setDocumentTitle(title: string) {
  document.title = `${title} - bilibili 直播助手`;
}

const lazyLoad = (children: React.ReactNode) => {
  return <Suspense>{children}</Suspense>;
};

const routes = [
  {
    path: '/',
    element: lazyLoad(<Home />),
    loader: () => {
      setDocumentTitle('控制面板');
      return null;
    }
  },
  {
    path: '/danmu',
    element: lazyLoad(<Versions />),
    loader: () => {
      setDocumentTitle('弹幕姬');
      return null;
    }
  }
];

export default routes;
