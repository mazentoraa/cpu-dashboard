import { useEffect, useState } from "react";
import Card from "./Card";
import { ref, set } from 'firebase/database';
import { database } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

export default function List({list, deleteList}){
    const [cards, setCards] = useState(list.cards || [])

    useEffect(() => {
        const listRef = ref(database, `lists/${list.id}/cards`);
        set(listRef, cards);
    }, [cards, list.id]);

    const addNewCard = () => {
        const newCard = { id: uuidv4(), content: '', problink: '', description: ''};
        const updatedCards = [...cards, newCard];
        setCards(updatedCards);
    };

    const updateCardContent = (id, updatedCard) => {
        const updatedCards = cards.map((card) =>
            card.id === id ? updatedCard : card
        );
        setCards(updatedCards);
    };

    const deleteCard = (id) => {
        const updatedCards = cards.filter((card) => card.id !== id);
        setCards(updatedCards);
    };

    const handleDeleteList = () => {
        if(confirm("Are you sure to delete this list?"))
            deleteList(list.id);
    };

    return(
        <>
            <div className="list">
                <div className="card-header">
                    <div>
                        <input
                            className="list-name"
                            placeholder="Your name"
                            value={list.name}
                            readOnly
                        />
                        <button onClick={handleDeleteList}>X</button>
                    </div>
                    <hr/>
                </div>
                <div className="cards">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        updateCardContent={updateCardContent}
                        deleteCard={deleteCard}
                    />                
                    ))}
                </div>
                <div className="card-footer">
                    <hr/>
                    <button className="add-card-button" onClick={addNewCard}>Add a card</button>
                </div>
            </div>
        </>
    )
}