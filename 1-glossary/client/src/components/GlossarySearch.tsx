import React, { Dispatch, FC, SetStateAction } from 'react';

import { GlossaryItem } from '../types';

interface Props {
  glossary: GlossaryItem[];
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setFilteredGlossary: Dispatch<SetStateAction<GlossaryItem[]>>;
}

const GlossarySearch: FC<Props> = ({ glossary, searchTerm, setSearchTerm, setFilteredGlossary }) => {
  const handleSearch = (term: string) => {
    if (term === '') {
      setSearchTerm('');
      setFilteredGlossary([]);
      return;
    }

    setSearchTerm(term);
    const filtered = glossary.filter(
      (item) =>
        item.term.toLowerCase().includes(term.toLowerCase()) ||
        item.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredGlossary(filtered);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilteredGlossary([]);
  };

  return (
    <div>
      <label htmlFor='search'>Search: </label>
      <input
        id='search'
        type='text'
        name='search'
        value={searchTerm}
        onChange={(event) => handleSearch(event.target.value)}
      />
      {searchTerm && <button type='button' onClick={handleClearSearch}>Clear</button>}
    </div>
  );
};

export default GlossarySearch;
