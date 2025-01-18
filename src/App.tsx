import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import HomePage from './page/HomePage';
import LoginPage from './page/LoginPage';
import NotFoundPage from './page/NotFoundPage';
import LandingPage from './page/LandingPage';
import ServicePage from './page/ServicePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* update page path here */}
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="services" element={<ServicePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
