import React, { useState } from 'react'
import List from './List'

export default function AddList(props) {
    const [listName, setListName] = useState('');

    const handleAddList = () => {
        if (listName.trim() !== '') {
            props.addListToDatabase(listName);
            setListName('');
        }
        <List/>
    };
    const handleEnterKey = (e) => {
        if (e.key === 'Enter')
            handleAddList()
    }

  return (
    <div className='add-list'>
        <input
                type="text"
                placeholder="List name"
                className='add-list-input'
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                onKeyDown={handleEnterKey}
            />
      <button className='add-list-button' onClick={handleAddList}> + Add a new list</button>
    </div>
  )
}
