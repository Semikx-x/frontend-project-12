import './App.css'
import { Login } from './components/pages/login.jsx'
import { NotF } from './components/pages/Notfound.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
   

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/*" element={<NotF/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
