import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './components/Notfound';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path='register' Component={Register}/>
          <Route path="*" Component={NotFound} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
