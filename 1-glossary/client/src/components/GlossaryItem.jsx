import React, { useState } from 'react';

const GlossaryItem = ({ item, onEdit, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [term, setTerm] = useState(item.term);
  const [description, setDescription] = useState(item.description);

  const handleSubmit = (event) => {
    event.preventDefault();
    onEdit(item.id, { term, description });
    setEditing(false);
  };

  const handleCancel = () => {
    setTerm(item.term);
    setDescription(item.description);
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete(item.id);
  };

  return (
    <div>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={term}
            onChange={(event) => setTerm(event.target.value)}
          />
          <input
            type='text'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <button type='submit'>Save</button>
          <button type='button' onClick={handleCancel}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
          <button type='button' onClick={() => setEditing(true)}>
            Edit
          </button>
          <button type='button' onClick={handleDelete}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default GlossaryItem;
