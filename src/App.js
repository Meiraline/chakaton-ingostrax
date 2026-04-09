import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainPage from './pages/main';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import GamePage from './pages/GamePage';
import { getArticles } from './api/blog';

const articleRoutes = getArticles();

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<ArticlePage />} />
            {articleRoutes.map((article) => (
              <Route
                key={article.slug}
                path={article.url}
                element={<ArticlePage articleSlug={article.slug} />}
              />
            ))}
            <Route path="/contacts" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/game/:sessionGameID"
              element={
                <ProtectedRoute>
                  <GamePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;