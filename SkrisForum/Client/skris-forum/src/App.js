import './App.css';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import NotPage from './components/NotPage';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<RequireAuth allowedRoles={["ADMIN", "USER"]}><Home /></RequireAuth>} />
        <Route path="*" element={<NotPage />} />
      </Route>
    </Routes>
  );
}

export default App;
