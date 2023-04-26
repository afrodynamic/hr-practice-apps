import React from 'react';

import GlossaryForm from './GlossaryForm.jsx';
import GlossaryList from './GlossaryList.jsx';

const Glossary = () => {
  const [glossary, setGlossary] = React.useState([]);

  return (
    <div>
      <h1>Glossary</h1>
      <GlossaryList glossary={glossary} setGlossary={setGlossary} />
      <GlossaryForm glossary={glossary} setGlossary={setGlossary} />
    </div>
  );
};
export default Glossary;
