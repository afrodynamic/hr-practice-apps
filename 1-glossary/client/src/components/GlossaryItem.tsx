import React, { FC, FormEvent, useState } from 'react';

import { GlossaryItem as GlossaryItemType } from '../types';

interface Props {
  item: GlossaryItemType;
  onEdit: (item: GlossaryItemType) => void;
  onDelete: (id: string) => void;
}

const GlossaryItem: FC<Props> = ({ item, onEdit, onDelete }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [term, setTerm] = useState<string>(item.term);
  const [description, setDescription] = useState<string>(item.description);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onEdit({ _id: item._id, term, description });
    setEditing(false);
  };

  const handleCancel = () => {
    setTerm(item.term);
    setDescription(item.description);
    setEditing(false);
  };

  const handleDelete = () => {
    if (item._id) {
      onDelete(item._id);
    }
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
