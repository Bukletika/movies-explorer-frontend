import './Profile.css';
import React, { useState } from 'react';
import { useHistory  } from "react-router-dom";
import ProfileForm from '../ProfileForm/ProfileForm';
import Header from '../Header/Header';

function Profile(props) {

  const userData = props.userData;

  const history = useHistory();

  const [name, setName] = useState(props.userData.name);
  const [email, setEmail] = useState(props.userData.email);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  // Активность кнопки отправки данных с формы
  const [buttonCondition, setButtonCondition] = useState(false);

  // Функция отправки данных с формы
  function handleSubmit(e) {

    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    console.log(name);
    console.log(email);
  }

  // Проверим валидность данных и изменим состояние кнопки
  function handleButton () {
    if (name && email) {
      setButtonCondition(true);
    }
  }

  function handleLogout() {
    props.setLoggedIn(false);
    history.push('/signin');
  }


  // Проверка Email
  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Введите правильный e-mail');
      setButtonCondition(false);
    } else {
      setEmailError('');
      if (e.target.value !== props.userData.email) {
        handleButton();
      } else {
        setButtonCondition(false);
      }
    }
  }

  // Проверка имени
  const nameHandler = (e) => {
    setName(e.target.value);
    if (e.target.value.length < 3) {
      setNameError('Введите правильное имя');
      setButtonCondition(false);
    }
    else {
      setNameError('');
      if (e.target.value !== props.userData.name) {
        handleButton();
      } else {
        setButtonCondition(false);
      }
    }
  }

  return (
    <>
      <Header loggedIn={props.loggedIn}/>
      <section className="profile">
        <ProfileForm
          name="form-profile"
          submitBtnText="Редактировать"
          onSubmit={handleSubmit}
          buttonCondition = {buttonCondition}
          userData = {userData}
        >
          <fieldset className="form-profile__field">
            <label className="form-profile__label" htmlFor="name">Имя</label>
            <input className={nameError ? 'form-profile__input form-profile__input_type_error' : 'form-profile__input'} onChange = {e => nameHandler(e)} name="name" type="text" placeholder="Имя" id="name" value={name} required/>
            {nameError && <div className="form-profile__error">{nameError}</div>}
          </fieldset>
          <fieldset className="form-profile__field">
            <label className="form-profile__label" htmlFor="email">E-mail</label>
            <input className={emailError ? 'form-profile__input form-profile__input_type_error' : 'form-profile__input'} onChange = {e => emailHandler(e)} name="email" type="text" placeholder="E-mail" id="email" value={email} required/>
            {emailError && <div className="form-profile__error">{emailError}</div>}
          </fieldset>
        </ProfileForm>

        <button className="profile__logout" onClick={handleLogout}>Выйти из аккаунта</button>
      </section>
    </>
  )
}

export default Profile;
