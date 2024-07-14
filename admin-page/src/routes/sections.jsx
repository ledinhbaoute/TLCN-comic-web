import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import { checkAuth } from 'src/security/Authentication';

export const IndexPage = lazy(() => import('src/pages/app'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const ReportPage = lazy(() => import('src/pages/report'));
export const GenrePage = lazy(() => import('src/pages/genre'));
export const PackagePage = lazy(() => import('src/pages/package'));
export const TransactionPage = lazy(() => import('src/pages/transaction'));
export const PricePage = lazy(() => import('src/pages/price'));
// ----------------------------------------------------------------------

const checkLogin = (loggedIn, element) => {
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout>
      <Suspense>
        {element}
      </Suspense>
    </DashboardLayout>
  );
};
export default function Router() {

  const routes = useRoutes([
    {
      element: checkLogin(checkAuth(),<Outlet/>)
       
      ,
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        {path:'report',element:<ReportPage/>},
        {path:'genre',element:<GenrePage/>},
        {path:'package-premium',element:<PackagePage/>},
        {path:'transaction',element:<TransactionPage/>},
        {path:'price',element:<PricePage/>}
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
