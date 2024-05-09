import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import SmallEntreprise from './SmallEntreprise';

import './index.css';
import Login from './Login';
import Individual from './Individual';
import AdminDashboard from './AdminDashboard';
import AddIndividual from './AddIndividual';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/SmallEntreprise/:user_id" element={<SmallEntreprise />} />
      <Route path="/Individual/:user_id" element={<Individual />} />
      <Route path="/Admin" element={<AdminDashboard />} />
      <Route path="/Admin/Individual/Add" element={<AddIndividual />} />
    </Routes>
  </Router>
);