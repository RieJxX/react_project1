import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './styles/App.css';
import About from "./pages/About";
import Posts from "./pages/Posts"

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path = "/posts" element = {<Posts/>}/>
        </Routes>
      </BrowserRouter>
    );
} 

export default App;
