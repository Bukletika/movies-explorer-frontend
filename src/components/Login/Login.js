import './Login.css';
import React, { useState } from 'react';
import { useHistory  } from "react-router-dom";
import Logo from '../Logo/Logo';
import {Link} from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';

function Login(props) {

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Активность кнопки отправки данных с формы
  const [buttonCondition, setButtonCondition] = useState(false);

  // Функция отправки данных с формы
  function handleSubmit(e) {

    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    console.log(email);
    console.log(password);
    props.setLoggedIn(true);
    history.push('/movies');
  }

  // Проверим валидность данных и изменим состояние кнопки
  function handleButton () {
    if (email && password) {
      setButtonCondition(true);
    }
  }


  // Проверка Email
  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Что-то пошло не так...');
      setButtonCondition(false);
    } else {
      setEmailError('');
      handleButton();
    }
  }

  // Проверка пароля
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setPasswordError('Что-то пошло не так...');
      setButtonCondition(false);
    }
    else {
      setPasswordError('');
      handleButton();
    }
  }

    return (
        <>
        <section className="login">
          <div className="login__container">
            <Logo />
            <AuthForm
              title="Рады видеть!"
              name="login"
              submitBtnText="Войти"
              onSubmit={handleSubmit}
              buttonCondition = {buttonCondition}
            >
              <fieldset className="form__fields">

                  <label className="form__label" htmlFor="email">E-mail</label>
                  <input className={emailError ? 'form__input form__input_type_error' : 'form__input'} onInput = {e => emailHandler(e)} name="email" type="text" placeholder="E-mail" id="email" value={email} autoComplete="off" required/>
                  {emailError && <div className="form__error">{emailError}</div>}

                  <label className="form__label" htmlFor="password">Пароль</label>
                  <input className={passwordError ? 'form__input form__input_type_error' : 'form__input'} onInput = {e => passwordHandler(e)} name="password" type="password" placeholder="Пароль" id="password" value={password} autoComplete="off" required/>

                  {passwordError && <div className="form__error">{passwordError}</div>}
              </fieldset>
            </AuthForm>
            <p className="login__subtitle">Еще не зарегистрированы?
              <Link className="login__link" to="/signup"> Регистрация</Link>
            </p>
          </div>
        </section>
       </>
    )
}

export default Login;
