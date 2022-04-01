import React from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";


function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const handleEditAvatarClick = () => {
    setisEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setisEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setisAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setisEditAvatarPopupOpen(false);
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setSelectedCard({});
  };

  return (
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          buttonText="Сохранить"
        >
          <fieldset className="form__set">
            <input
              type="url"
              name="avatar"
              id="avatar"
              placeholder="Ссылка"
              className="form__input"
              required
            />
            <span id="avatar-error" className="form__input-error"></span>
          </fieldset>
        </PopupWithForm>

        <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          buttonText="Сохранить"
        >
          <fieldset className="form__set">
            <input
              type="text"
              name="username"
              id="name"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              className="form__input"
              required
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
            />
            <span id="jobName-error" className="form__input-error"></span>
          </fieldset>
        </PopupWithForm>

        <PopupWithForm
          name="new-card"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonText="Создать"
        >
          <fieldset className="form__set">
            <input
              type="text"
              name="name"
              id="title"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              className="form__input"
              required
            />
            <span id="title-error" className="form__input-error"></span>
            <input
              type="url"
              name="link"
              id="link"
              placeholder="Ссылка"
              className="form__input"
              required
            />
            <span id="link-error" className="form__input-error"></span>
          </fieldset>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <PopupWithForm
          name="remove-form"
          title="Вы уверены?"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonText="Да"
        >
        </PopupWithForm>


      </div>
  );
}

export default App;
