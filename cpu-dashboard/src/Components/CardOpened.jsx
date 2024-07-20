import React, { useEffect, useState } from 'react'

export default function CardOpened({card, updateCardContent, deleteCard, onClose}) {

    const [problink, setProbLink] = useState(card.problink || '');
    const [description, setDescription] = useState(card.description || '');
    const [isValidLink, setIsValidLink] = useState(card.problink);

    useEffect(() => {
        setProbLink(card.problink || '');
        setDescription(card.description || '');
    }, [card]);

    const handleProbLinkChange = (e) => {
        setProbLink(e.target.value);
        updateCardContent(card.id, { ...card, problink: e.target.value });
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        updateCardContent(card.id, { ...card, description: e.target.value });
    };

    const handleDeleteCard = () => {
        if(confirm("Are you sure to delete this card?")){
            deleteCard(card.id);
            onClose();
        }
    };

    const handlePaste = (e) => {
        const pastedData = (e.clipboardData || window.clipboardData).getData('text');
        if (isValidURL(pastedData)) {
            setProbLink(pastedData);
            setIsValidLink(true);
            updateCardContent(card.id, { ...card, problink: pastedData });
        }
    };
    const isValidURL = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };
    const modifyLink = () => setIsValidLink(false)
    const handleEnterKey = (e) => {
        if(e.key === 'Enter') {
            if (isValidURL(e.target.value)) {
                setProbLink(e.target.value);
                setIsValidLink(true);
                updateCardContent(card.id, { ...card, problink: e.target.value });
            }
        }
    }


  return (
    <>
    <div className="card-opened-overlay" onClick={onClose}></div>
            <div className="card-opened" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                <h2>{card.content}</h2>
                <div className='inputs'>
                {isValidLink ? (<div className='link'>
                        <a href={problink} target="_blank" rel="noopener noreferrer" className='problem-link-valid'>
                            Click here to go to the link.
                        </a><button className='modify-link-button' onClick={modifyLink}>Modify</button>
                        </div>
                    ) : (
                        <input
                            className='problem-link'
                            placeholder='Link to your submission'
                            value={problink}
                            onChange={handleProbLinkChange}
                            onPaste={handlePaste}
                            onKeyDown={handleEnterKey}
                        />
                    )}
                    <textarea
                    className='description'
                    placeholder='Paste your solution here'
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <button className='delete-card-btn' onClick={handleDeleteCard}>Delete card</button>
            </div>
        </div>
    </>
  )
}
