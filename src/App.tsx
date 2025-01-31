import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ProfilePage } from './pages/ProfilePage';
import { AuthPage } from './pages/AuthPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Корневой маршрут для авторизации / */}
        <Route path="/" element={<AuthPage />} />
        {/* Маршрут к профилю */}
        <Route path="/profile" element={<ProfilePage />} />
        {/* Все остальные маршруты перенаправляют на / */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
