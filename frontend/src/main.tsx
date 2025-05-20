import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './index.css'
import LandingPage from './LandingPage.tsx'
import OverViewTextRoom from './mainpage/OverViewTextRoom.tsx';
import RegisterPage from './login_register/register.tsx';
import LoginPage from './login_register/login.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path = "/" element={<LandingPage />} />
        <Route path = "/toOverViewTextRoom" element={<OverViewTextRoom />} />
        <Route path = "/register" element={<RegisterPage />} />
        <Route path = "/login" element={<LoginPage />} />
      </Routes>
    </Router>
  </StrictMode>,
)
