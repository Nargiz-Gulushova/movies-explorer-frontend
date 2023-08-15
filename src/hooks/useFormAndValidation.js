import { useState, useCallback } from 'react';

const useFormAndValidation = (initialValues = {}, initialErrors = {}, initialValid = false) => {
  const [ values, setValues ] = useState(initialValues);
  const [ errors, setErrors ] = useState(initialErrors);
  const [ isValid, setValid ] = useState(initialValid);
  const regexEmail = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u;

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setValid(evt.target.closest('form').checkValidity());
  };

  const handleChangeEmail = (evt) => {
    handleChange(evt);

    const { type, value } = evt.target;

    if (type === 'email' && !regexEmail.test(value)) {
      setValid(false);
      setErrors((errors) => {
        return {
          ...errors,
          email: 'Проверьте почту: pochta@yandex.ru'
        };
      });
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setValid(newIsValid);
    },
    [ setValues, setErrors, setValid ]
  );

  return {
    values,
    errors,
    setErrors,
    isValid,
    handleChange,
    handleChangeEmail,
    resetForm,
    setValues,
    setValid,
  };
};

export default useFormAndValidation;
