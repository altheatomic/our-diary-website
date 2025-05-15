import {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user từ token khi app khởi chạy
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded.id });
      } catch (err) {
        console.error('Invalid token. Logging out.');
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
      }
    }
  }, [navigate]);

  // Đăng nhập thành công
  const login = (token) => {
    localStorage.setItem('token', token);
    try {
      const decoded = jwtDecode(token);
      setUser({ id: decoded.id });
      navigate('/home');
    } catch (err) {
      console.error('Login failed: invalid token');
      setUser(null);
      navigate('/login');
    }
  };

  // Đăng xuất
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook dùng trong component
export const useAuth = () => useContext(AuthContext);
