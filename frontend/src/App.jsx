import './App.css'
import { Login } from './pages/login.jsx'
import { NotF } from './pages/Notfound.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {<Login/>}
        <Route path="/login" element={<Login/>}/>
        <Route path="/*" element={<NotF/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
