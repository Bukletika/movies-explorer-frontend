import React from 'react';
import { Link } from 'react-router-dom';

// Импорт стилей
import './Logo.css';

// Импорт изображений
import logo from '../../images/logo.svg';

function Logo() {
  return (
    <Link className="logo" to='/' title="На главную">
      <img className="logo__img" src={logo} alt="Логотип Поиск фильмов" />
    </Link>
  );
};

export default Logo;
