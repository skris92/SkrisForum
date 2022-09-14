import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import RequireAuth from './components/RequireAuth';
import useAuth from './hooks/useAuth';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import Browse from './components/Browse';
import NotPage from './components/NotPage';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

function App() {
  const { auth, logout, checkExpired } = useAuth();

  useEffect(() => {
      if (auth && checkExpired()) {
          logout();
      }
  });

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="browse" element={<RequireAuth allowedRoles={["ADMIN", "USER"]}><Browse /></RequireAuth>} />
        <Route path="profile" element={<RequireAuth allowedRoles={["ADMIN", "USER"]}><Profile /></RequireAuth>} />
        <Route path="*" element={<NotPage />} />
      </Route>
    </Routes>
  );
}

export default App;
