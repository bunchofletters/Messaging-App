import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './index.css'
import LandingPage from './LandingPage.tsx'
import OverViewTextRoom from './mainpage/OverViewTextRoom.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path = "/" element={<LandingPage />} />
        <Route path = "/toOverViewTextRoom" element={<OverViewTextRoom />} />
      </Routes>
    </Router>
  </StrictMode>,
)
