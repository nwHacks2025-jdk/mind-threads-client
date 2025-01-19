import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './page/HomePage';
import NotFoundPage from './page/NotFoundPage';
import LandingPage from './page/LandingPage';
import NotesPage from './page/NotesPage';
import UserPage from './page/UserPage';
import CssBaseline from '@mui/material/CssBaseline';
import ConversationPage from './page/ConversationPage';
import { AuthProvider } from './context/AuthContent';
import { ProtectedRoute } from './ProtectedRoutes';

function App() {
  return (
    <AuthProvider>
      <CssBaseline />
      <BrowserRouter>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />

            {/* protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="home" element={<HomePage />} />
              <Route path="threads" element={<NotesPage />} />
              <Route path="threads/:tag" element={<NotesPage />} />
              <Route path="user" element={<UserPage />} />
              <Route
                path="conversation/:title"
                element={<ConversationPage />}
              />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
