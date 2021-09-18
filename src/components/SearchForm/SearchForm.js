import React from 'react';

import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormValidation from '../../hooks/useFormValidation';

function SearchForm({
  isChecked,
  searchMovies,
  handleCkecked,
}) {

  const {
    values,
    errorMessages,
    isValid,
    handleInputChange,
  } =  useFormValidation({});

   // Функция отправки данных с формы
   const handleSubmit = (evt) => {
    evt.preventDefault();

    searchMovies(values.search, isChecked);

  }

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <fieldset className="search__films">
          <input
            className={`search__form-input ${errorMessages.search ? "search__form-input_type_error" : ""}`}
            type="search"
            name="search"
            placeholder="Фильм"
            onChange={handleInputChange}
            value={values.search || ''}
            autoComplete="off"
            minLength="2"
            required
           />
           {isValid ? '' : <div className="search__form-error">{errorMessages.search}</div>}
          <button className="search__form-button" type="submit">Найти</button>
        </fieldset>

        <FilterCheckbox filterHandler={handleCkecked}/>

      </form>
    </div>
  )
}

export default SearchForm;
