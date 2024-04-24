// MunkalapDetail.js

import React, { useState, useEffect } from 'react';

const enumToReadable = {
    enum_value_1: 'Aktív',
    enum_value_2: 'Lezárt'
    // Folytasd a többi értékkel...
  };
  const enumToReadable2 = {
      enum_value_1: 'Negyed',
      enum_value_2: 'Fél',
      enum_value_3: 'Háromnegyed',
      enum_value_4: 'Tele'
      // Folytasd a többi értékkel...
    };



function MunkalapDetail({ match }) {
  const [munkalap, setMunkalap] = useState(null);
  const [editMunkalap, setEditMunkalap] = useState(null);
  const munkalapId = match.params.id;

  useEffect(() => {
    fetchMunkalap();
  }, []);

  const fetchMunkalap = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/munkalapok/${munkalapId}/`);
      const data = await response.json();
      setMunkalap(data);
      setEditMunkalap(data);
    } catch (error) {
      console.error('Error fetching munkalap:', error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMunkalap({ ...munkalap, [name]: value });
  setEditMunkalap({ ...editMunkalap, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const munkalapId = match.params.id;
      await fetch(`http://localhost:8000/api/munkalapok/${munkalapId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editMunkalap),
      });
      console.log('POST request data:', editMunkalap); // Log data here
      // Redirect or do something after successful update
    } catch (error) {
      console.error('Error updating megrendelo:', error);
    }
  };


  if (!munkalap) {
    return <div>Loading...</div>;
  }

  return (
    <div>
       <form onSubmit={handleSubmit}>
      <h2>Munkalap részletei</h2>
      <p><strong>Munkalap száma:</strong> <input type="text" name="munkalapszam" value={munkalap.munkalapszam} onChange={handleChange} disabled /></p>

<p><strong>Létrehozva:</strong> <input type="text" name="datum" value={munkalap.datum} onChange={handleChange} disabled /></p>
<p><strong>Utólsó módosítás</strong> <input type="text" name="utolsomodositas" value={munkalap.utolsomodositas} onChange={handleChange}disabled /></p>
<p><strong>Megrendelő:</strong> <input type="text" name="megrendelo" value={munkalap.megrendelo_id} onChange={handleChange} disabled/></p>
<p><strong>Kmóra állás:</strong> <input type="text" name="kmoraallas" value={munkalap.kmoraallas} onChange={handleChange}disabled /></p>
<p><strong>Üzemanyagszint:</strong> <input type="text" name="uzemenyagszint" value={enumToReadable2[munkalap.uzemenyagszint]} onChange={handleChange} disabled
/></p>
<p><strong>Hibatípus:</strong> <input type="text" name="hibatipus" value={munkalap.hibatipus_id} onChange={handleChange}disabled /></p>

<p><strong>Státusz:</strong><select name="munkalapstatus" value={munkalap.munkalapstatus} onChange={handleChange} >
        <option value="enum_value_1">Aktív</option>
        <option value="enum_value_2">Lezárt</option>
        </select></p>
        <p><strong>Hibaleírás:</strong> <input type="text" name="hibaleiras" value={munkalap.hibaleiras} onChange={handleChange} /></p>

<p><strong>Várható határidő:</strong> <input type="text" name="varhatohatarido" value={munkalap.varhatohatarido} onChange={handleChange} /></p>

<p><strong>Elvégzett munka:</strong> <input type="text" name="elvegzettmunka" value={munkalap.elvegzettmunka} onChange={handleChange} /></p>
<p><strong>Felhasznált anyag:</strong> <input type="text" name="felhasznaltanyag" value={munkalap.felhasznaltanyag} onChange={handleChange} /></p>
<button type="submit">Mentés</button>
      </form>
      {/* További részletek */}
    </div>
  );
}

export default MunkalapDetail;
