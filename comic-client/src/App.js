import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './components/Notfound';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ComicDetailPage from './components/pages/comic-detail.page';
import GenresPage from './components/pages/genres.page';
import ForgetPassword from './components/ForgetPassword';
import PageLayout from './components/PageLayout';
import { checkAuth } from './security/Authentication';

import ComicReadingPage from './components/pages/comic-reading.page';
import ComicPage from './components/ComicPage';
import FavoriteComicPage from './components/FavoriteComicPage';
import HistoryReadingPage from './components/HistoryReading';
import SearchResutlItem from './components/SearchResultItem';


function App() {

  useEffect(() => {
    checkAuth();
  })

  return (
   
      <BrowserRouter>
        <Routes>
            <Route element={<PageLayout />}>
            <Route exact path="/" Component={Home} />
            <Route path="/login" Component={Login} />
            <Route path='/register' Component={Register} />
            <Route path='/comic-detail/:comicId' Component={ComicDetailPage} />
            <Route path='/genres/:genreId/:indexPage' Component={GenresPage} />
            <Route path='/forgetpass' Component={ForgetPassword} />
            <Route path='/chapter/:chapterId' Component={ComicReadingPage} />
            <Route path='/comic/:listBy/:indexPage' Component={ComicPage} />
            <Route path='/favorite-comic' Component={FavoriteComicPage} />
            <Route path='/history-reading' Component={HistoryReadingPage} />
          </Route>
          <Route path="*" Component={NotFound} />
        </Routes>
      </BrowserRouter>
  
  );
}

export default App;
