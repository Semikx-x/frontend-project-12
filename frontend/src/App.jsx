import { Login } from './components/pages/login.jsx'
import { NotF } from './components/pages/Notfound.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Chats } from './components/pages/chats.jsx';
import { useEffect } from 'react';
import { restoreAuth } from './components/slices/LoginSlice.js';
import { Registration } from './components/pages/registration.jsx';
import { Layout } from './components/layout.jsx';
import { Provider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: import.meta.env.NODE_ENV || 'development',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

function App() {
  
  useEffect(() => {
    restoreAuth()
  }, []);

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary
        fallbackUI={() => (
          <div style={{ padding: '20px', color: 'red' }}>
            <h2>Oops, something went wrong.</h2>
            <p>We've been notified and are looking into it.</p>
          </div>
        )}
      >
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/main" element={<Chats />} />
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Registration />} />
              
              <Route path="/*" element={<NotF />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  )
}

export default App