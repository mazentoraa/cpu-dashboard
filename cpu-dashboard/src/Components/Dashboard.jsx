import React, { useEffect, useState } from 'react'
import AddList from './AddList'
import { ref, set, onValue, push, remove } from 'firebase/database';
import List from './List';
import { v4 as uuidv4 } from 'uuid';


export default function Dashboard({database}) {
    const [lists, setLists] = useState([])
    
    useEffect(() => {
        if (!database) return;
        const dataRef = ref(database, 'lists/');
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const listsArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                    cards: (data[key].cards || []).map(card => ({
                        id: card.id || uuidv4(),
                        ...card
                    }))
                }));
                setLists(listsArray);
            } else {
                setLists([]);
            }
        });
    }, []);

    const addListToDatabase = (listName) => {
        const newListRef = push(ref(database, 'lists/'));
        set(newListRef, { name: listName, cards: [] });
    };

    const deleteList = (id) => {
        const listRef = ref(database, `lists/${id}`);
        remove(listRef);
    };

  return (
    <div className="dashboard">
            {lists.map((list) => (
                 <List key={list.id} list={list} deleteList={deleteList} database={database}/>
            ))}
            <AddList lists={lists} setLists={setLists} addListToDatabase={addListToDatabase} database={database}/>
    </div>
  )
}
