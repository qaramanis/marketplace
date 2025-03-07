import { useState } from 'react';
import { BsCart3, BsSearch } from 'react-icons/bs';
import { FiUser } from "react-icons/fi";
import '../css/NavBar.css';

import ProfileMenu from './ProfileMenu';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>MarketPlace</h1>
      </div>
      
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-icon-button">
              <BsSearch className="search-icon" />
            </button>
          </div>
        </form>
      </div>

      <div className="navbar-actions">
        <div className="navbar-icon">
          <BsCart3 className="icon" />
          <span className="icon-label">Cart</span>
        </div>
        <ProfileMenu />
      </div>
    </nav>
  );
};

export default Navbar;