// src/Card.js
import React, { useState } from 'react';
import CardOpened from './CardOpened';

const Card = ({ card, updateCardContent, deleteCard }) => {
    const [isOpened, setIsOpened] = useState(false);
    const [content, setContent] = useState(card.content);

    const handleChange = (e) => {
        setContent(e.target.value);
        updateCardContent(card.id, { ...card, content: e.target.value });
    };

    const openCard = () => {
        setIsOpened(true);
    };

    const closeCard = () => {
        setIsOpened(false);
    };

    return (
        <>
            <div className='card'>
                <input
                    className='card-name'
                    placeholder='Problem name'
                    value={content}
                    onChange={handleChange}
                />
                <img
                    onClick={openCard}
                    className='open-card-button'
                    src="/img/openCard.png"
                    alt="Open Card"
                />
            </div>
            {isOpened && (
                <div className={`card-opened-overlay ${isOpened ? 'show' : ''}`} onClick={closeCard}>
                    <div className="card-opened">
                        <CardOpened card={card} updateCardContent={updateCardContent} onClose={closeCard} deleteCard={deleteCard} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Card;
