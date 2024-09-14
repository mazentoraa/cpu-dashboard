import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function List({list, deleteList, database}){
    const [cards, setCards] = useState(list.cards || [])
    const [isAddingCard, setIsAddingCard] = useState(false);
    const listContainerRef = useRef(null);
    
    useEffect(() => {
        if (listContainerRef.current) {
            listContainerRef.current.scrollTo({ top: listContainerRef.current.scrollHeight, behavior: 'smooth' });            setIsAddingCard(false);
            setIsAddingCard(false)
        }
    }, [isAddingCard]);
    
    useEffect(() => {
        // Ensure the list is at the top on initial load
        if (listContainerRef.current) {
            listContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });        }
    }, []);

    useEffect(() => {
        const listRef = ref(database, `lists/${list.id}/cards`);
        set(listRef, cards);
    }, [cards, list.id]);

    const addNewCard = () => {
        const newCard = { id: uuidv4(), content: '', problink: '', description: ''};
        const updatedCards = [...cards, newCard];
        setCards(updatedCards);
        setIsAddingCard(true);
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

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedCards = Array.from(cards);
        const [movedCard] = reorderedCards.splice(result.source.index, 1);
        reorderedCards.splice(result.destination.index, 0, movedCard);
        setCards(reorderedCards);
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
                <div className="cards" 
                    style={{ maxHeight: '400px', overflowY: 'auto' }}
                    ref={listContainerRef}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="cards">
                        {(provided) => (
                            <div className="cards-droppable"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {cards.map((card, index) => (
                                    <Draggable key={card.id} draggableId={card.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Card
                                                    key={card.id}
                                                    card={card}
                                                    updateCardContent={updateCardContent}
                                                    deleteCard={deleteCard}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                </div>
                <div className="card-footer">
                    <hr/>
                    <button className="add-card-button" onClick={addNewCard}>Add a card</button>
                </div>
            </div>
        </>
    )
}