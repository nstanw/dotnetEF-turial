import React, { Component } from 'react';
import './custom.css';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Note from './components/Note';
import { useSelector } from 'react-redux';

export default function App() {
  const getUrlRedux = useSelector((state) => state.note.checkURL);
  return (
    <>
      <Routes>
        <Route
          path='/:url'
          element={<Note />}
        />
        <Route
          path='/'
          element={<Note />}
        />
      </Routes>
    </>
  );
}
