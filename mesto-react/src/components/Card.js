import React, { useContext } from "react";
import { CurrentUserContext } from "./App";

const Card = ({ card, onCardClick }) => {
  const currentUser = useContext(CurrentUserContext);

  const handleClick = () => {
    onCardClick(card);
  };

// Владелец карточки
const isOwn = card.owner._id === currentUser._id;



// Лайк, поставленный текущим пользователем
const isLiked = card.likes.some(i => i._id === currentUser._id);


// Для кнопки лайка
const cardLikeButtonClassName = (
  `element__like-btn ${isLiked ? 'element__like-btn_active' : ''}`
); 

  return (
    <div className="element">
      <img
        className="element__img"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__bottom-block">
        <h3 className="element__title">{card.name}</h3>
        <div className="element__likes">
          <button type="button" className={cardLikeButtonClassName}></button>
          <span className="element__likes-number">{card.likes.length}</span>
        </div>
        {isOwn && <button type="button" className='element__delete-btn' />}
      </div>
    </div>
  );
};

export default Card;
