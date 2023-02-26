import { FunctionComponent, lazy, Suspense } from 'react'
import { Route } from 'react-router-dom'

import NotFound from '@pages/NotFound'

interface IRoute {
  path: string
  name: string
  component: any
  children?: IRoute[]
  requireAuth?: boolean;
}

export const ROUTE_PATHS = {
  MAIN: '/',
  EMPLOYEE: '/employee',
  CAFE: '/cafe',
}

const MainPage = lazy(() => import('@pages/Main'));
const EmployeePage = lazy(() => import('@pages/Employee'));
const CafePage = lazy(() => import('@pages/Cafe'));


const LazyLoadRoute = (Component: FunctionComponent) => (
  <Suspense fallback={<>Loading...</>}>
    <Component />
  </Suspense>
)

const renderRoutes = (items: IRoute[]) =>
  items.map((route) => {
    if (route.children) {
      return (
        <Route
          key={route.name}
          path={route.path}
          element={route.component}
        >
          {renderRoutes(route.children)}
          <Route key="not-found" path="*" element={<NotFound />} />
        </Route>
      )
    }
    return (
      <Route
        key={route.name}
        path={route.path}
        element={route.component}
      />
    )
  })
export const AUTH_ROUTES: IRoute[] = [
  {
    path: ROUTE_PATHS.MAIN,
    name: 'Main page',
    requireAuth: true,
    component: LazyLoadRoute(MainPage),
    children: [
      {
        path: ROUTE_PATHS.EMPLOYEE,
        name: 'Employee Page',
        component: LazyLoadRoute(EmployeePage),
      },
      {
        path: ROUTE_PATHS.CAFE,
        name: 'Cafe Page',
        component: LazyLoadRoute(CafePage),
      },
    ],
  },
]

export { LazyLoadRoute, renderRoutes }
