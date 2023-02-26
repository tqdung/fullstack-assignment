import { Routes, Route } from 'react-router-dom';

import { AUTH_ROUTES, renderRoutes } from '@routes/routes';

import NotFound from '@pages/NotFound';

const DynamicRoutes = () => (
  <Routes>
    {renderRoutes(AUTH_ROUTES)}
    <Route key="not-found" path="*" element={<NotFound />} />
  </Routes>
)

function App() {
  return (
    <div className="App">
      <DynamicRoutes />
    </div>
  );
}

export default App;
