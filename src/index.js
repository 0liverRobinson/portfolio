import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Canvas from './Matrix';
import Introduction from './Introduction';
import { Buffer, About, Projects, Certificates, Contact } from './Body';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Introduction />
    <Canvas />
    <Buffer />
    <About />
    <Projects />
    <Certificates />
    <Contact />

  </React.StrictMode>
);

// If you want to start measuring performance in your Body, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
