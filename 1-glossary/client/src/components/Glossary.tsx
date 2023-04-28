import React, { FC, useEffect } from 'react';

import { GlossaryItem } from '../types';
import GlossaryForm from './GlossaryForm.tsx';
import GlossaryList from './GlossaryList.tsx';
import GlossarySearch from './GlossarySearch.tsx';

const Glossary: FC = () => {
  const [glossary, setGlossary] = React.useState<GlossaryItem[]>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [filteredGlossary, setFilteredGlossary] = React.useState<GlossaryItem[]>([]);

  const fetchGlossary = async() => {
    const response = await fetch('/api/glossary');
    const data = await response.json();
    setGlossary(data);
  };

  useEffect(() => {
    fetchGlossary();
  }, []);

  return (
    <div>
      <h1>Glossary</h1>
      <GlossarySearch
        glossary={glossary}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setFilteredGlossary={setFilteredGlossary}
      />
      <GlossaryList
        glossary={glossary}
        setGlossary={setGlossary}
        searchTerm={searchTerm}
        filteredGlossary={filteredGlossary}
      />
      <GlossaryForm glossary={glossary} setGlossary={setGlossary} />
    </div>
  );
};
export default Glossary;
