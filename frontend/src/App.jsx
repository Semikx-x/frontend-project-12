import './App.css'
import { Login } from './components/pages/login.jsx'
import { NotF } from './components/pages/Notfound.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from './components/pages/main.jsx';
import { useEffect } from 'react';
import { restoreAuth } from './components/slices/LoginSlice.js'; 

function App() {
  
  useEffect(() => {
    restoreAuth()
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        
        <Route path="/*" element={<NotF />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App