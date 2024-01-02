// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage'; 
import MobileNav from './components/MobileNav';



const App = () => {
  return (
    <Router>
        <Header />
        <div className="app">
          <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} /> 
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
        <MobileNav />
        <Footer />
    </Router>
  );
};

export default App;