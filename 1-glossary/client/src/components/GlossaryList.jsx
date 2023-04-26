import React from 'react';

import GlossaryItem from './GlossaryItem.jsx';

const GlossaryList = ({ glossary, setGlossary, searchTerm, filteredGlossary }) => {
  const handleDelete = (id) => {
    setGlossary((prevGlossary) =>
      prevGlossary.filter((item) => item._id !== id)
    );
  };

  const handleEdit = (item) => {
    const termExists = glossary.some(
      (existingItem) =>
        existingItem._id !== item._id && existingItem.term === item.term
    );

    if (termExists) {
      alert(`The term "${item.term}" already exists in the glossary`);
      return;
    }

    setGlossary((prevGlossary) => {
      const index = prevGlossary.findIndex((item) => item._id === id);
      const oldItem = prevGlossary[index];
      const newItem = { ...oldItem, ...item };
      const before = prevGlossary.slice(0, index);
      const after = prevGlossary.slice(index + 1);
      return [...before, newItem, ...after];
    });
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
