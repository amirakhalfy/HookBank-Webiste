import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageMaram from './PageMaram';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/PageMaram" element={<PageMaram />} />
      </Routes>
  </Router>
)
