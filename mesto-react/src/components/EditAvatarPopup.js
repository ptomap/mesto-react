import React from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__set">
        <input
          type="url"
          name="avatar"
          id="avatar"
          placeholder="Ссылка на картинку"
          className="form__input"
          required
          ref={avatarRef}
        />
        <span id="avatar-error" className="form__input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
