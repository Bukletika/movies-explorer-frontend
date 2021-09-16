import './Register.css';
import React, { useState } from 'react';
import { useHistory  } from "react-router-dom";
import Logo from '../Logo/Logo';
import {Link} from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';

function Register() {

  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Активность кнопки отправки данных с формы
  const [buttonCondition, setButtonCondition] = useState(false);

  // Функция отправки данных с формы
  function handleSubmit(e) {

    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    console.log(name);
    console.log(email);
    console.log(password);
    history.push('/signin');
  }

  // Проверим валидность данных и изменим состояние кнопки
  function handleButton () {
    if (name && email && password) {
      setButtonCondition(true);
    }
  }

  // Проверка имени
  const nameHandler = (e) => {
    setName(e.target.value);
    if (e.target.value.length < 3) {
      setNameError('Имя должно быть от 3 символов!');
      setButtonCondition(false);
    }
    else {
      setNameError('');
      handleButton();
    }
  }

  // Проверка Email
  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный email');
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
        <section className="register">
          <div className="register__container">
            <Logo />
            <AuthForm
              title="Добро пожаловать!"
              name="register"
              submitBtnText="Зарегистрироваться"
              onSubmit={handleSubmit}
              buttonCondition = {buttonCondition}
            >
              <fieldset className="form__fields">
                  <label className="form__label" htmlFor="name">Имя</label>
                  <input className={nameError ? 'form__input form__input_type_error' : 'form__input'} onChange = {e => nameHandler(e)} name="name" type="text" placeholder="Имя" id="name" value={name} autoComplete="off" required/>
                  {nameError && <div className="form__error">{nameError}</div>}

                  <label className="form__label" htmlFor="email">E-mail</label>
                  <input className={emailError ? 'form__input form__input_type_error' : 'form__input'} onChange = {e => emailHandler(e)} name="email" type="text" placeholder="E-mail" id="email" value={email} required/>
                  {emailError && <div className="form__error">{emailError}</div>}

                  <label className="form__label" htmlFor="password">Пароль</label>
                  <input className={passwordError ? 'form__input form__input_type_error' : 'form__input'} onChange = {e => passwordHandler(e)} name="password" type="password" placeholder="Пароль" id="password" value={password} required autoComplete="off"/>

                  {passwordError && <div className="form__error">{passwordError}</div>}
              </fieldset>
            </AuthForm>
            <p className="register__subtitle">Уже зарегистрированы?
              <Link className="register__link" to="/signin"> Войти</Link>
            </p>
          </div>
        </section>
       </>
    )
}

export default Register;
