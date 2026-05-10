import { Login } from './components/pages/login.jsx'
import { NotF } from './components/pages/Notfound.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Chats } from './components/pages/chats.jsx';
import { useEffect } from 'react';
import { restoreAuth } from './components/slices/LoginSlice.js';
import { Registration } from './components/pages/registration.jsx';
import { Layout } from './components/Layout';

function App() {
  
  useEffect(() => {
    restoreAuth()
  }, []);

  return (
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
  )
}

export default App