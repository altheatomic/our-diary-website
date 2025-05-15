import { Link, useLocation } from 'react-router-dom';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Memories', path: '/memories' },
    { name: 'Life Target', path: '/life-target' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Account', path: '/account' },
  ];

  // logout
  const handleLogoutConfirm = () => {
    const confirmed = window.confirm("Confirm to logout?");
    if (confirmed) logout();
  };

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Our Diary</h1>

      <div className="flex space-x-4 items-center">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`px-3 py-2 rounded ${
              location.pathname === item.path
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            {item.name}
          </Link>
        ))}

        {/* Icon Settings */}
        <Link
          to="/settings"
          className={`p-2 rounded-full ${
            location.pathname === '/settings'
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          <FiSettings size={20} />
        </Link>

        {/* Logout with hover spin + confirm */}
        <button
          onClick={handleLogoutConfirm}
          title="Logout"
          className="p-2 rounded-full text-gray-700 hover:bg-gray-200 transition-transform duration-200 hover:rotate-90"
        >
          <FiLogOut size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
