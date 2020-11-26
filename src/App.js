import React from 'react';
import './App.css';

function App() {
  const quest = [
    '1',
    '2',
    '3'
  ];

  return (
    <main>
      {
        quest.map(e =>  <p>{e}</p>)
      }
    </main>
  );
}

export default App;
