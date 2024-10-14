import React from 'react';
import { NavLink } from 'react-router-dom';
const homeUrl = process.env.REACT_APP_HOME_URL;
const aboutUrl = process.env.REACT_APP_ABOUT_URL;
const contactUrl = process.env.REACT_APP_CONTACT_URL;
const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to={homeUrl} exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={aboutUrl} activeClassName="active">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to={contactUrl} activeClassName="active">
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;