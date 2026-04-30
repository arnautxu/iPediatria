import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LegalNotice from './pages/LegalNotice';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import CookieBanner from './components/layout/CookieBanner';
import Stage from './components/layout/Stage';

export default function App() {
  return (
    <>
      <Stage />
      <a className="skip-link" href="#inici">
        Salta al contingut
      </a>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/legal" element={<LegalNotice />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
      </Routes>
      <Footer />
      <CookieBanner />
    </>
  );
}
