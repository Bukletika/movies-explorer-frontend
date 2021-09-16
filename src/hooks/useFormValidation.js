import { useState } from 'react';

// Валидация данных формы
function useFormValidation () {
  // Значения
  const [values, setValues] = useState({});

  // Передадим ошибки
  const [errorMessages, setErrorMessages] = useState({});

  const [isValid, setIsValid] = useState(false);

  function handleInputChange(evt) {
    let trimInput = evt.target.value.trim()

    setValues({
      ...values,
      [evt.target.name]: trimInput
    });

    setErrorMessages({
      ...errorMessages,
      [evt.target.name]: evt.target.validationMessage
    });

    setIsValid(
      evt.target.closest("form").checkValidity());
  };

  function reset() {
    setValues({});
    setErrorMessages({});
    setIsValid(false);
  }

  return {
    values,
    setValues,
    errorMessages,
    isValid,
    setIsValid,
    handleInputChange,
    reset
   };

}

export default useFormValidation;
