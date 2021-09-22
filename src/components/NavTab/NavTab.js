import './NavTab.css';
import React from 'react';
import { navigationLinks } from '../../utils/utils';

function NavTab() {

  const navTabLinks = navigationLinks.map((item) => (
    <li className="navtab__item" key={item.id}>
      <a className="navtab__link" href={item.link}>
        {item.title}
      </a>
    </li>
  ))

  return (
    <nav className="navtab">
      <ul className="navtab__list">
        {navTabLinks}
      </ul>
    </nav>
  )
}

export default NavTab;
