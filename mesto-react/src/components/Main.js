import React from "react";
import api from "../utils/api";
import Card from "./Card";

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) => {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);
 
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);


  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile page__profile">
        <div className="profile__card">
          <img
            className="profile__avatar"
            src={userAvatar}
            alt="Аватар пользователя"
          />
          <button
            className="profile__avatar-btn"
            onClick={onEditAvatar}
          ></button>
          <div className="profile__info">
            <h1 className="profile__title">{userName}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            ></button>
            <p className="profile__description">{userDescription}</p>  
          </div>
        </div>

        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {cards.map((card) => {
          return (
            <Card key={card._id} card={card} onCardClick={onCardClick} />
          );
        })}
      </section>
    </main>
  );
};

export default Main;
