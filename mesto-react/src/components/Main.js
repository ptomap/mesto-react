import React, { useContext } from "react";
import api from "../utils/api";
import Card from "./Card";
import { CurrentUserContext } from "./App";

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) => {
  const [cards, setCards] = React.useState([]);

  const {name, about, avatar} = useContext(CurrentUserContext);

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
            src={avatar}
            alt="Аватар пользователя"
          />
          <button
            className="profile__avatar-btn"
            onClick={onEditAvatar}
          ></button>
          <div className="profile__info">
            <h1 className="profile__title">{name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            ></button>
            <p className="profile__description">{about}</p>
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
