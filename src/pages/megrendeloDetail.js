// MegrendeloDetail.js

import React, { useState, useEffect } from 'react';


function MegrendeloDetail({ match }) {
  const [megrendelo, setMegrendelo] = useState(null);
  const [editMegrendelo, setEditMegrendelo] = useState(null);

  useEffect(() => {
    fetchMegrendelo();
  }, []);

  const fetchMegrendelo = async () => {
    const megrendeloId = match.params.id;
    try {
      const response = await fetch(`http://localhost:8000/api/megrendelok/${megrendeloId}/`);
      const data = await response.json();
      setMegrendelo(data);
      setEditMegrendelo(data); // Inicializáljuk az űrlapot az aktuális rekord adataival
    } catch (error) {
      console.error('Error fetching megrendelo:', error);
    }
  };

  const handleDelete = async () => {
    const megrendeloId = match.params.id;
    try {
      await fetch(`http://localhost:8000/api/megrendelok/${megrendeloId}/`, {
        method: 'DELETE',
      });
      // Redirect or do something after successful deletion
    } catch (error) {
      console.error('Error deleting megrendelo:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditMegrendelo({ ...editMegrendelo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const megrendeloId = match.params.id;
      await fetch(`http://localhost:8000/api/megrendelok/${megrendeloId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editMegrendelo),
      });
      // Redirect or do something after successful update
    } catch (error) {
      console.error('Error updating megrendelo:', error);
    }
  };

  if (!megrendelo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Megrendelő </h2>
      <form onSubmit={handleSubmit}>
        <p><strong>Név:</strong> <input type="text" name="nev" value={editMegrendelo.nev} onChange={handleChange} /></p>
        <p><strong>Cím:</strong> <input type="text" name="cim" value={editMegrendelo.cim} onChange={handleChange} /></p>
        <p><strong>E-mail:</strong> <input type="email" name="email" value={editMegrendelo.email} onChange={handleChange} /></p>
        <p><strong>Telefon:</strong> <input type="text" name="telefon" value={editMegrendelo.telefon} onChange={handleChange} /></p>
        <p><strong>Rendszám:</strong> <input type="text" name="rendszam" value={editMegrendelo.rendszam} onChange={handleChange} /></p>
        <p><strong>Gyártmány:</strong> <input type="text" name="gyartmany" value={editMegrendelo.gyartmany} onChange={handleChange} /></p>
        <p><strong>Típus:</strong> <input type="text" name="tipus" value={editMegrendelo.tipus} onChange={handleChange} /></p>
        <p><strong>Gyártási év:</strong> <input type="text" name="gyartasi_ev" value={editMegrendelo.gyartasi_ev} onChange={handleChange} /></p>
        <p><strong>Alvázszám:</strong> <input type="text" name="alvazszam" value={editMegrendelo.alvazszam} onChange={handleChange} /></p>
        {/* Add other fields here */}
        <button onClick={handleSubmit}>Mentés</button>
      </form>
      <button onClick={handleDelete}>Törlés</button>
     
    </div>
  );
}

export default MegrendeloDetail;
