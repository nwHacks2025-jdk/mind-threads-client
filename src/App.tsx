import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import HomePage from './page/HomePage';
import LoginPage from './page/LoginPage';
import NotFoundPage from './page/NotFoundPage';
import LandingPage from './page/LandingPage';
import StudyPage from './page/StudyPage';
import UserPage from './page/UserPage';
import CssBaseline from '@mui/material/CssBaseline';
import ConversationPage from './page/ConversationPage';

function App() {
  return (
    <div className="app-container">
      <CssBaseline />
      <BrowserRouter>
        <div className="main-content">
          <Routes>
            {/* update page path here */}
            <Route path="/" element={<LandingPage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="study" element={<StudyPage />} />
            <Route path="user" element={<UserPage />} />
            <Route path="conversation" element={<ConversationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
