import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Spin } from '@arco-design/web-react';

import routes from './router';

const router = createHashRouter(routes);

function Router() {
  return <RouterProvider router={router} fallbackElement={<Spin />} />;
}

export default Router;
