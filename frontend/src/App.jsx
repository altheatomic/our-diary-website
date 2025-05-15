import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Memories from './pages/Memories';
import LifeTarget from './pages/LifeTarget';
import Gallery from './pages/Gallery';
import Account from './pages/Account';
import Settings from './pages/Settings';
import MainLayout from './layout/MainLayout';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      {/* Không có Navbar */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Các route có Navbar và cần đăng nhập */}
      <Route element={<MainLayout />}>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/memories"
          element={
            <PrivateRoute>
              <Memories />
            </PrivateRoute>
          }
        />
        <Route
          path="/life-target"
          element={
            <PrivateRoute>
              <LifeTarget />
            </PrivateRoute>
          }
        />
        <Route
          path="/gallery"
          element={
            <PrivateRoute>
              <Gallery />
            </PrivateRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;