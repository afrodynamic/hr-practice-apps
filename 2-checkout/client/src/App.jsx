import React from 'react';

const App = () => {
  return (
    <div>
      <p>Hello, World!</p>
      <p>
        <code>Page Cookie: {JSON.stringify(document.cookie, undefined, '\t')}</code>
      </p>
    </div>
  );
};

export default App;
