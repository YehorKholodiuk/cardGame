import React from 'react';
import BacksideOfCard from './image/piratecard.jpg';
import "./Card.css";

const Card = ({card, handleChoice, TurnAroundCard, pause}) => {

    const handleClick = () => {
        if(!pause){
            handleChoice(card);
        }

    }

    return (
        <div className="Card">

            <div className={TurnAroundCard ? "TurnAroundCard" : ""}>
                <img src={`${card.image}`} alt="Framsida" className="FrontOfCardimage"/>
                <img src={`${BacksideOfCard}`} alt="Baksida" onClick={handleClick} className="BackOfCardimage" />
            </div>

        </div>
    );
};


export default Card;