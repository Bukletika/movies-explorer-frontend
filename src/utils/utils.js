import movieOne from '../images/movie1.jpg';
import movieTwo from '../images/movie2.jpg';
import movieThree from '../images/movie3.jpg';
import movieFour from '../images/movie4.jpg';

// Пункты меню на главной странице
export const navigationLinks = [
  {
    title: 'О проекте',
    link: '#about-project',
    id: '1'
  },
  {
    title: 'Технологии',
    link: '#techs',
    id: '2'
  },
  {
    title: 'Студент',
    link: '#about-me',
    id: '3'
  }
]

// Список фильмов
export const moviesList = [
  {
    id: 1,
    image: movieOne,
    title: '33 слова о дизайне',
    duration: '1ч 17м',
    saved: true,
    shortFilm: 'false'
  },
  {
    id: 2,
    image: movieTwo,
    title: 'Киноальманах «100 лет дизайна»',
    duration: '1ч 17м',
    saved: true,
    shortFilm: 'false'
  },
  {
    id: 3,
    image: movieThree,
    title: 'В погоне за Бенкси',
    duration: '1ч 17м',
    saved: false,
    shortFilm: 'false'
  },
  {
    id: 4,
    image: movieFour,
    title: 'Баския: Взрыв реальности',
    duration: '55м',
    saved: false,
    shortFilm: 'true'
  },
  {
    id: 5,
    image: movieFour,
    title: 'Баския: Взрыв реальности',
    duration: '55м',
    saved: false,
    shortFilm: 'true'
  },
  {
    id: 6,
    image: movieFour,
    title: 'Баския: Взрыв реальности',
    duration: '55м',
    saved: false,
    shortFilm: 'true'
  },
  {
    id: 7,
    image: movieFour,
    title: 'Баския: Взрыв реальности',
    duration: '55м',
    saved: false,
    shortFilm: 'true'
  },
  {
    id: 8,
    image: movieFour,
    title: 'Баския: Взрыв реальности',
    duration: '55м',
    saved: false,
    shortFilm: 'true'
  },
  {
    id: 9,
    image: movieFour,
    title: 'Баския: Взрыв реальности',
    duration: '55м',
    saved: false,
    shortFilm: 'true'
  },
  {
    id: 10,
    image: movieFour,
    title: 'Баския: Взрыв реальности',
    duration: '55м',
    saved: false,
    shortFilm: 'true'
  },
  {
    id: 11,
    image: movieFour,
    title: 'Баския: Взрыв реальности',
    duration: '55м',
    saved: false,
    shortFilm: 'true'
  },
  {
    id: 12,
    image: movieFour,
    title: 'Баския: Взрыв реальности',
    duration: '55м',
    saved: false,
    shortFilm: 'true'
  }
]


// Данные пользователя
export const userData = {
  name: 'Антон',
  email: 'test@tester.ru'
}

// Основное меню
export const siteMenu = [
  {
    title: 'Фильмы',
    link: '/movies',
    id: 1
  },
  {
    title: 'Сохраненные фильмы',
    link: '/saved-movies',
    id: 2
  }
]
