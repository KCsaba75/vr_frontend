// MegrendeloList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MegrendeloList() {
  const [megrendelok, setMegrendelok] = useState([]);

  useEffect(() => {
    fetchMegrendelok();
  }, []);

  const fetchMegrendelok = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/megrendelok/');
      const data = await response.json();
      setMegrendelok(data);
    } catch (error) {
      console.error('Error fetching megrendelok:', error);
    }
  };

  return (
    <div>
      <h2>Megrendelők</h2>
      <Link to="/megrendelo/new">Új megrendelő létrehozása</Link>
      <ul>
        {megrendelok.map(megrendelo => (
          <li key={megrendelo.id}>
            <Link to={`/megrendelo/${megrendelo.id}`}>{megrendelo.nev}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MegrendeloList;
