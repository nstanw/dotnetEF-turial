import React from 'react';
import Core from './components/Core/Core';
import Footer from './components/footer/Footer';
import Header from './components/header/Header'
import Slogan from './components/Slogan';
import { useSelector } from 'react-redux';
import './custom.css'

export default function App() {
  const STORE = useSelector((state) => state);

  return (
    <div className=' smtper wallpaper webp' >
      {STORE.form.show && !STORE.form.showMobile && <Header />}
      {STORE.form.show && !STORE.form.showMobile && <Slogan />}
      <Core />
      {STORE.form.show && !STORE.form.showMobile && <Footer />}
    </div>
  );
}

