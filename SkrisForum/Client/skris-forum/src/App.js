import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import NotPage from './components/NotPage';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="*" element={<NotPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
