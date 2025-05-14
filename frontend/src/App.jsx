import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Memories from './pages/Memories';
import LifeTarget from './pages/LifeTarget';
import Gallery from './pages/Gallery';
import Account from './pages/Account';
import Settings from './pages/Settings';
import MainLayout from './layout/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Không có Navbar */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Có Navbar */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/life-target" element={<LifeTarget />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/account" element={<Account />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;