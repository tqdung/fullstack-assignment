import { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useCustomizedSelector } from '@redux/hook';
import { AUTH_ROUTES, renderRoutes } from '@routes/routes';

import Loading from '@components/Loading';

import NotFound from '@pages/NotFound';

import { LodashUtils } from '@utils/lodash';

const DynamicRoutes = () => (
  <Routes>
    {renderRoutes(AUTH_ROUTES)}
    <Route key="not-found" path="*" element={<NotFound />} />
  </Routes>
)

const GlobalLoading = () => {
  const loadingList = useCustomizedSelector((state) => state.loading.loadings);
  const data = useMemo(() => LodashUtils.get(loadingList, '0', undefined), [loadingList]);
  return <Loading show={!LodashUtils.isEmpty(data)} title={data?.title || ''} subtitle={data?.subtitle} />;
};

function App() {
  return (
    <div className="App">
      <GlobalLoading />
      <DynamicRoutes />
    </div>
  );
}

export default App;
