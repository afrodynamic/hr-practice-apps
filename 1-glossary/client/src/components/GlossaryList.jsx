import React from 'react';

import GlossaryItem from './GlossaryItem.jsx';

const GlossaryList = ({ glossary, setGlossary }) => {
  const handleDelete = (id) => {
    setGlossary((prevGlossary) =>
      prevGlossary.filter((item) => item.id !== id)
    );
  };

  const handleEdit = (id, item) => {
    const termExists = glossary.some(
      (existingItem) =>
        existingItem.id !== id && existingItem.term === item.term
    );

    if (termExists) {
      alert(`The term "${item.term}" already exists in the glossary`);
      return;
    }

    setGlossary((prevGlossary) => {
      const index = prevGlossary.findIndex((item) => item.id === id);
      const oldItem = prevGlossary[index];
      const newItem = { ...oldItem, ...item };
      const before = prevGlossary.slice(0, index);
      const after = prevGlossary.slice(index + 1);
      return [...before, newItem, ...after];
    });
  };

  return (
    <dl>
      {glossary.map((item) => (
        <GlossaryItem
          key={item.id}
          item={item}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </dl>
  );
};

export default GlossaryList;
