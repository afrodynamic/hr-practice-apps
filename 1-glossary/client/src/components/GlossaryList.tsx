import React, { Dispatch, FC, SetStateAction } from 'react';

import GlossaryItem from './GlossaryItem';

import { GlossaryItem as GlossaryItemType } from '../types';

interface Props {
  glossary: GlossaryItemType[];
  setGlossary: Dispatch<SetStateAction<GlossaryItemType[]>>;
  searchTerm: string;
  filteredGlossary: GlossaryItemType[];
}

const GlossaryList: FC<Props> = ({ glossary, setGlossary, searchTerm, filteredGlossary }) => {
  const handleDelete = async(id: string | undefined) => {
    if (!id) {
      return;
    }

    try {
      const response = await fetch(`/api/glossary/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setGlossary((prevGlossary) =>
          prevGlossary.filter((item) => item._id !== id)
        );
      }
    } catch (error) {
      console.error('Error deleting term: ', error);
    }
  };

  const handleEdit = async(item: GlossaryItemType) => {
    const termExists = glossary.some(
      (existingItem) =>
        existingItem._id !== item._id && existingItem.term === item.term
    );

    if (termExists) {
      alert(`The term "${item.term}" already exists in the glossary`);
      return;
    }

    try {
      const response = await fetch(`/api/glossary/${item._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        const updatedTerm = await response.json();
        setGlossary((prevGlossary) =>
          prevGlossary.map((term) =>
            term._id === updatedTerm._id ? updatedTerm : term
          )
        );
      }
    } catch (error) {
      console.error('Error updating term: ', error);
    }
  };

  return (
    <>
      {searchTerm !== '' && filteredGlossary.length === 0 && <p>No terms found.</p>}
      <dl>
        {(filteredGlossary.length === 0 ? glossary : filteredGlossary).map((item) => (
          <GlossaryItem
            key={item._id}
            item={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </dl>
    </>
  );
};

export default GlossaryList;
