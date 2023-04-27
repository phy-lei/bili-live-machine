import { lazy, Suspense } from 'react';

const Danmaku = lazy(() => import('@renderer/pages/danmaku/danmaku'));
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
    path: '/danmaku',
    element: lazyLoad(<Danmaku />),
    loader: () => {
      setDocumentTitle('弹幕姬');
      return null;
    }
  }
];

export default routes;
