import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InputResume from './pages/InputResume';
import Home from './pages/index';
import DisplayResume from './pages/DisplayResume';
import SignIn from './components/authUser/SignIn';
import { Provider } from './context/users';
import SignUp from './components/authUser/SignUp';

function App() {

  return (
    <>
      <Provider>
        <BrowserRouter>
          {/* <Link to='/createResume'>create new resume</Link> */}
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/createResume" element={<InputResume />} />
            <Route path="/displayResume" element={<DisplayResume />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
