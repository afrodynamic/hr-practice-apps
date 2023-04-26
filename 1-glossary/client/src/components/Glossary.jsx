import React, {useEffect} from 'react';

import GlossaryForm from './GlossaryForm.jsx';
import GlossaryList from './GlossaryList.jsx';
import GlossarySearch from './GlossarySearch.jsx';

const Glossary = () => {
  const [glossary, setGlossary] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredGlossary, setFilteredGlossary] = React.useState([]);

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
