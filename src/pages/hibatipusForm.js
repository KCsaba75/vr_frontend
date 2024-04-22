// HibatipusForm.js

import React, { useState, useEffect } from 'react';

function HibatipusForm({ hibatipusId }) {
  const [hiba, setHiba] = useState('');

  useEffect(() => {
    if (hibatipusId) {
      fetchHibatipus();
    }
  }, [hibatipusId]);

  const fetchHibatipus = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/hibatipusok/${hibatipusId}/`);
      const data = await response.json();
      setHiba(data.hiba);
    } catch (error) {
      console.error('Error fetching hibatipus:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hibatipusData = { hiba };
    try {
      if (hibatipusId) {
        await fetch(`http://localhost:8000/api/hibatipusok/${hibatipusId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(hibatipusData),
        });
      } else {
        await fetch('http://localhost:8000/api/hibatipusok/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(hibatipusData),
        });
      }
      // Redirect or do something after successful form submission
    } catch (error) {
      console.error('Error submitting hibatipus form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Hiba:</label>
      <input type="text" value={hiba} onChange={(e) => setHiba(e.target.value)} />
      <button type="submit">Mentés</button>
    </form>
  );
}

export default HibatipusForm;
