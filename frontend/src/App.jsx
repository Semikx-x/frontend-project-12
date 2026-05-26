import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';
import Login from './components/pages/login.jsx';
import NotF from './components/pages/Notfound.jsx';
import Chats from './components/pages/chats.jsx';
import { restoreAuth } from './components/slices/LoginSlice.js';
import Registration from './components/pages/registration.jsx';
import Layout from './components/layout.jsx';

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: import.meta.env.NODE_ENV || 'development',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const RollbarFallback = () => (
  <div style={{ padding: '20px', color: 'red' }}>
    <h2>Oops, something went wrong.</h2>
    <p>We&apos;ve been notified and are looking into it.</p>
  </div>
);

const App = () => {
  useEffect(() => {
    restoreAuth();
  }, []);

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary fallbackUI={<RollbarFallback />}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Chats />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Registration />} />

              <Route path="/*" element={<NotF />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
