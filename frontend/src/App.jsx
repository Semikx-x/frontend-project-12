import './App.css'
import {Login, NotF} from './pages'
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
