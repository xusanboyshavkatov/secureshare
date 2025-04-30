import React from 'react'
import Securmsg from './pages/secure/Securmsg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Notfound from './pages/404/Notfound';

const App = () => {

  


  return (

    // <Securmsg></Securmsg>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/secret/:token" element={<Securmsg />} />
        <Route path="*" element={<Notfound/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App