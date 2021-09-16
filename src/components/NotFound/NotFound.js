import React from 'react';
import { useHistory } from 'react-router';
import './NotFound.css';

function NotFound() {
  const history = useHistory();

  return (
    <section className='not-found'>
      <div className='not-found__container'>
        <h1 className='not-found__title'>404</h1>
        <p className='not-found__subtitle'>Страница не найдена</p>
      </div>
      <button
        type="button"
        className='not-found__button'
        onClick={() => history.goBack()}
      >
        Назад
      </button>
    </section>
  );
}
export default NotFound;
