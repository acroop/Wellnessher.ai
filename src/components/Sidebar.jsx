import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiX, FiSettings, FiUser, FiLogOut } from 'react-icons/fi'; // 👈 Added LogOut icon
import { useTheme } from '../context/ThemeContext';

const menuItems = [
  { label: 'Home', route: '/' },
  { label: 'Period Tracker', route: '/period-tracker' },
  { label: 'PCOS Management', route: '/pcos-management' },
  { label: 'Pregnancy Tracker', route: '/pregnancy-tracker' },
  { label: 'Breast Cancer Awareness', route: '/breast-cancer-awareness' },
  { label: 'Cervical Cancer Awareness', route: '/cervical-cancer-awareness' }, // ✅ Added here
  { label: 'Medical Records', route: '/medical-history' },
  { label: 'MediDocs', route: '/medidocs' },
  { label: 'Consult a Doctor', route: '/consult-doctor' },
  { label: 'Early Detection', route: '/researcher' },
];


const Sidebar = ({ open, setOpen }) => {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate(); // 👈 Add navigate hook

  const handleLogout = () => {
    // Clear relevant localStorage values
    localStorage.removeItem('user');
    localStorage.removeItem('@user_authenticated');
    localStorage.removeItem('@user_email');
    localStorage.removeItem('@user_name');
    localStorage.removeItem('@user_picture');
    localStorage.removeItem('@user_initial');
    setOpen(false);
    navigate('/auth');
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        onClick={() => setOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'
          }`}
        style={{ backgroundColor: theme.card, color: theme.text }}
      >
        <div
          className="flex justify-between items-center px-4 py-3 border-b"
          style={{ borderColor: theme.border }}
        >
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setOpen(false)} style={{ color: theme.text }}>
            <FiX size={22} />
          </button>
        </div>

        <div className="py-3 px-4 space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.route}
              to={item.route}
              onClick={() => setOpen(false)}
              className={`block px-2 py-2 rounded hover:opacity-80 hover:bg-[#FF69B4] ${location.pathname === item.route ? 'font-bold' : ''
                } transition-colors duration-300`} 
              style={{ color: theme.text }}
            >
              {item.label}
            </Link>
          ))}
          <hr className="my-3" style={{ borderColor: theme.border }} />
          <Link to="/profile" onClick={() => setOpen(false)} className="transition-colors duration-300 flex items-center space-x-2 px-2 hover:bg-[#FF69B4] py-2 rounded hover:opacity-80" style={{ color: theme.text }}>
            <FiUser size={18} />
            <span>Profile</span>
          </Link>
          <Link to="/settings" onClick={() => setOpen(false)} className="transition-colors duration-300 flex items-center space-x-2 px-2 hover:bg-[#FF69B4] py-2 rounded hover:opacity-80" style={{ color: theme.text }}>
            <FiSettings size={18} />
            <span>Settings</span>
          </Link>

          {/* ✅ Logout Button */}
          <button
            onClick={handleLogout}
            className="transition-colors duration-300 flex items-center space-x-2 px-2 py-2 rounded hover:bg-[#FF69B4] hover:opacity-80 w-full text-left mt-4"
            style={{ color: theme.text }}
          >
            <FiLogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
