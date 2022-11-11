import React, { Component } from 'react';
import './custom.css'
import Note from './components/Note';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
     <>
     <Note/>
     </>
    );
  }
}
