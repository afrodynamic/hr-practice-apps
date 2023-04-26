import React, { useState } from 'react';

const GlossaryForm = ({ glossary, setGlossary }) => {
  const [term, setTerm] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = async(newItem) => {
    if (glossary.some(
      (item) => item.term.toLowerCase() === newItem.term.toLowerCase()
    )) {
      alert(`${newItem.term} is already in the glossary.`);
      return;
    }

    try {
      const response = await fetch('/api/glossary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        const data = await response.json();

        setGlossary((prevGlossary) => [
          ...prevGlossary,
          data,
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAdd({ term, description });
    setTerm('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Term</h2>
      <label htmlFor='term'>Term</label>
      <input
        id='term'
        type='text'
        name='term'
        value={term}
        onChange={(event) => setTerm(event.target.value)}
      />
      <label htmlFor='description'>Description</label>
      <input
        id='description'
        type='text'
        name='description'
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button type='submit'>Add</button>
    </form>
  );
};

export default GlossaryForm;
