// MunkalapList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MunkalapList() {
  const [munkalapok, setMunkalapok] = useState([]);

  useEffect(() => {
    fetchMunkalapok();
  }, []);

  const fetchMunkalapok = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/munkalapok/');
      const data = await response.json();
      setMunkalapok(data);
    } catch (error) {
      console.error('Error fetching munkalapok:', error);
    }
  };



 
      

  return (
    <div>
        
      <h2>Munkalapok</h2>
       <Link to="/munkalapok/new">Új munkalap létrehozása</Link>
      <ul>
        {munkalapok.map(munkalap => (
          <li key={munkalap.id}>
            <Link to={`/munkalapok/${munkalap.id}`}>{munkalap. munkalapszam}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MunkalapList;
