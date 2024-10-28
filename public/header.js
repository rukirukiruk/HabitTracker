import React from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { path: process.env.REACT_APP_HOME_URL, name: 'Home' },
  { path: process.env.REACT_APP_ABOUT_URL, name: 'About' },
  { path: process.env.REACT_APP_CONTACT_URL, name: 'Contact' },
];

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink 
                to={link.path} 
                activeClassName="active"
                exact={link.path === process.env.REACT_APP_HOME_URL}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;