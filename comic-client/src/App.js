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
import ProfileSidebar from './components/ProfileSidebar';
import ComicManage from './components/ComicManage';
import ChapterManage from './components/ChapterManage';
import PrivateRoute from './security/PrivateRoute';
import Loading from './components/Loading';
import OtpDialogInput from './components/dialogs/OTPDialogInput';
import Wallet from './components/Wallet';
import PaymentInfoPage from './components/PaymentInfoPage';
import PremiumRoute from './security/PremiumRoute';
import Statistic from './components/Statistic';
import User from './components/User';
import UserPublic from './components/UserPublic';
import SearchComic from "./components/SearchComic";
import { Toaster } from 'react-hot-toast';


function App() {
  return (

    <BrowserRouter>
    <Toaster/>
      <Routes>
        <Route element={<PageLayout />}>
          <Route exact path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path='/register' Component={Register} />

          <Route path='/genres/:genreId/:indexPage' Component={GenresPage} />
          <Route path='/forgetpass' Component={ForgetPassword} />
          <Route path='/comic-detail/:comicId' Component={ComicDetailPage} />
          <Route path='/chapter/:chapterId' Component={ComicReadingPage} />
          <Route path='/comic/:listBy/:indexPage' Component={ComicPage} />
          <Route path='/favorite-comic' Component={FavoriteComicPage} />
          <Route path='/history-reading' Component={HistoryReadingPage} />
          <Route path='/testing' Component={OtpDialogInput} />
          <Route path='/user/:userId' Component={UserPublic}/>
          <Route path='/search-comic' Component={SearchComic} />

        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<ProfileSidebar />}>
            <Route path='/profile' Component={User} />
            <Route path='/comic-manage' Component={ComicManage} />
            <Route path='/statistic' Component={Statistic} />
            <Route path='/chapter-manage/:comicId' Component={ChapterManage} />
            <Route path='/wallet' Component={Wallet} />
            <Route path='/wallet/payment-info' Component={PaymentInfoPage} />
          </Route>
        </Route>
        <Route path="*" Component={NotFound} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
