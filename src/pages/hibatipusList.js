// HibatipusList.js

import React, { useState, useEffect } from 'react';

function HibatipusList() {
  const [hibatipusok, setHibatipusok] = useState([]);

  useEffect(() => {
    fetchHibatipusok();
  }, []);

  const fetchHibatipusok = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/hibatipusok/');
      const data = await response.json();
      setHibatipusok(data);
    } catch (error) {
      console.error('Error fetching hibatipusok:', error);
    }
  };

  return (
    <div>
      <h2>Hibatípusok</h2>
      <ul>
        {hibatipusok.map(hibatipus => (
          <li key={hibatipus.id}>{hibatipus.hiba}</li>
        ))}
      </ul>
    </div>
  );
}

export default HibatipusList;
