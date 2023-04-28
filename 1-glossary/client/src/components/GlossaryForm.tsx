import React, { Dispatch, SetStateAction, useState } from 'react';

import { GlossaryItem } from '../types';

interface Props {
  glossary: GlossaryItem[];
  setGlossary: Dispatch<SetStateAction<GlossaryItem[]>>;
}

const GlossaryForm: React.FC<Props> = ({ glossary, setGlossary }) => {
  const [term, setTerm] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleAdd = async(newItem: GlossaryItem) => {
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
        const data: GlossaryItem = await response.json();

        setGlossary((prevGlossary) => [...prevGlossary, data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
