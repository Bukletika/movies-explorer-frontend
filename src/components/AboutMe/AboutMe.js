import profilePhoto from '../../images/profile.jpg';
import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <div className="about-me__wrapper">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__info">
          <div className="about-me__info-profile">
            <h3 className="about-me__info-name">Антон</h3>
            <p className="about-me__info-subtitle">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__info-text">Я занимаюсь разработкой и созданием сайтов, SEO продвижением и рекламой Яндекс.Директ. Живу в г. Красноярске. Увлекаться созданием сайтов начал в 2005 году. Профессиональной разработкой стал заниматься с 2013 года. За это время я создал десятки сайтов для крупных компаний России. Основной упор делаю на качество создаваемых решений.</p>
            <ul className="about-me__info-items">
              <li className="about-me__info-item">
                <a className="about-me__info-link" href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
              </li>
              <li className="about-me__info-item">
                <a className="about-me__info-link" href="https://github.com" target="_blank" rel="noreferrer">Github</a>
              </li>
            </ul>
          </div>
          <img className="about-me__info-img" src={profilePhoto} alt="Антон Седин" />
        </div>

        <Portfolio />
      </div>
    </section>
  )
}

export default AboutMe;
