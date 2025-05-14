import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Memories', path: '/memories' },
    { name: 'Life Target', path: '/life-target' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Account', path: '/account' },
  ];

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Our Diary</h1>
      <div className="flex space-x-4">
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
      </div>
    </nav>
  );
};

export default Navbar;