import React, { Component } from 'react';
import Core from './components/Core/Core';
import Footer from './components/footer/Footer';
import Header from './components/header/Header'
import Slogan from './components/Slogan';
import './custom.css'

export default function App(){

  return (
    <div className=' smtper wallpaper webp' >
      <Header />
      <Slogan />
      <Core />
      <Footer/>
      
    </div>
  );
}

