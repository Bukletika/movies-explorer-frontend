export const optionsMovieApi = {
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    'Content-Type': 'application/json'
  }
};

export const optionsMainApi = {
  url: "https://api.movies-bukletika.nomoredomains.monster",
  headers: {
    'Content-Type': 'application/json'
  }
}

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
