import React from 'react';
import { Link, NavLink } from 'react-router-dom';

// Импорт констант
import { siteMenu } from '../../utils/utils';

// Импорт изображений
import accountImage from '../../images/account.svg';

// Импорт стилей
import './Navigation.css';

function Navigation(props) {
  return (
    <nav className={`navigation ${props.isMenuOpen ? "navigation_opened" : ""}`}>
      <button className="header__mobile-button header__mobile-button_active" type="button" onClick={props.handleCloseMenu}>
        <span className="header__mobile-line header__mobile-line_active"></span>
        <span className="header__mobile-line header__mobile-line_active"></span>
      </button>
      <ul className="navigation__list">

        <li className="navigation__item navigation__item_type_main">
          <NavLink exact className="navigation__link" activeClassName="navigation__link_type_active" to="/">Главная</NavLink>
        </li>

        {siteMenu.map((item) => (
          <li className="navigation__item" key={item.id}>
            <NavLink className="navigation__link" activeClassName="navigation__link_type_active" to={item.link}>{item.title}</NavLink>
          </li>
        ))}
      </ul>
      <Link className="navigation__profile-link" to="/profile">Аккаунт <img className="navigation__profile-img" src={accountImage} alt="Аватар" /></Link>
    </nav>
  );
};

export default Navigation;

