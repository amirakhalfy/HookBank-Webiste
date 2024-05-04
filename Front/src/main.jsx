import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import SmallEntreprise from './SmallEntreprise';

import './index.css';
import Login from './Login';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/SmallEntreprise" element={<SmallEntreprise />} />
    </Routes>
  </Router>
);