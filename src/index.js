import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // css
import App from './App'; // App.js를 가져옴
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// <App /> : react를 통해 만든 컴포넌트 (App.js에서 구현)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
