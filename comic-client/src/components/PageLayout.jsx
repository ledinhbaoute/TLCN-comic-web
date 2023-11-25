import { Outlet } from 'react-router-dom';
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const PageLayout = () => (
  <>
    <Header />
    <Outlet /> 
    <Footer />
  </>
);

export default PageLayout;