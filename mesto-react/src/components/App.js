import React from "react";

import Header from "./Header";
import Main from "./Main";
import api from "../utils/api";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";


export const CurrentUserContext = React.createContext();

function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
    cohort: "",
  });

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

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
    <CurrentUserContext.Provider value={currentUser}>
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
            <button type="submit" className="form__submit">
              Сохранить
            </button>
          </fieldset>
        </PopupWithForm>

        <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
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
            <button type="submit" className="form__submit">
              Сохранить
            </button>
          </fieldset>
        </PopupWithForm>

        <PopupWithForm
          name="new-card"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
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
            <button type="submit" className="form__submit">
              Создать
            </button>
          </fieldset>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <div className="popup popup_type_delete-card">
          <div className="popup__container">
            <button type="button" className="popup__close"></button>
            <h3 className="popup__title">Вы уверены?</h3>
            <form
              name="remove-form"
              action="#"
              className="form popup__form"
              noValidate
            >
              <button type="submit" className="form__submit">
                Да
              </button>
            </form>
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
