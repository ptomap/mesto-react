import React, { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      username: name,
      jobname: description,
    });
  };

  useEffect(() => {
    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <fieldset className="form__set">
        <input
          type="text"
          name="userName"
          id="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          className="form__input"
          required
          value={name || ''}
          onChange={handleNameChange}
        />
        <span id="name-error" className="form__input-error"></span>
        <input
          type="text"
          name="jobName"
          id="job"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          className="form__input"
          required
          value={description || ''}
          onChange={handleDescriptionChange}
        />
        <span id="jobName-error" className="form__input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
