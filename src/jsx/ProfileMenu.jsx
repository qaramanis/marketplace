// components/ProfileMenu.jsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../css/ProfileMenu.css';
import { FiUser } from "react-icons/fi";
const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const handleNavigation = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div className="profile-menu-container" ref={menuRef}>
      <div className="navbar-icon" onClick={() => setIsOpen(!isOpen)}>
        <FiUser className="icon" />
        <span className="icon-label">Profile</span>
      </div>

      {isOpen && (
        <div className="profile-dropdown">
          {user ? (
            <>
              <div className="menu-header">
                <span className="user-email">{user.email}</span>
              </div>
              <div className="menu-items">
                <button className="menu-item" onClick={() => handleNavigation('/account')}>
                  <span>My Account</span>
                </button>
                <button className="menu-item" onClick={() => handleNavigation('/orders')}>
                  <span>Orders</span>
                </button>
                <button className="menu-item" onClick={() => handleNavigation('/help')}>
                  <span>Help</span>
                </button>
                <button className="menu-item sign-out" onClick={handleSignOut}>
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          ) : (
            <div className="menu-items">
              <button className="menu-item" onClick={() => handleNavigation('/auth')}>
                <span>Sign In</span>
              </button>
              <button className="menu-item" onClick={() => handleNavigation('/signup')}>
                <span>Create Account</span>
              </button>
              <button className="menu-item" onClick={() => handleNavigation('/help')}>
                <span>Help</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;