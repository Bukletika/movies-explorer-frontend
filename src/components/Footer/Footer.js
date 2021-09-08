import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <h3 className="footer__heading">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className="footer__info">
          <p className="footer__copyright">&copy; 2021</p>
          <ul className="footer__items">
            <li className="footer__item">
              <a className="footer__link" href="https://yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li className="footer__item">
              <a className="footer__link" href="https://github.com" target="_blank" rel="noreferrer">Github</a>
            </li>
            <li className="footer__item">
              <a className="footer__link" href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
