// MunkalapForm.js

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
function MunkalapForm({ munkalapId }) {
  const [munkalap, setMunkalap] = useState({
    megrendelo_id: '',
 
    munkalapstatus: '',
    munkalapszam: '',
    kmoraallas: '',
    uzemenyagszint: '',
    hibatipus_id: '',
    hibaleiras: '',
    varhatohatarido: '',
    elvegzettmunka: '',
    felhasznaltanyag: ''
  });

  const [megrendelok, setMegrendelok] = useState([]);
  const [hibatipusok, setHibatipusok] = useState([]);

  useEffect(() => {
    fetchMegrendelok();
    fetchHibatipusok();
    if (munkalapId) {
      fetchMunkalap();
    }
  }, [munkalapId]);

  const fetchMegrendelok = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/megrendelok/');
      const data = await response.json();
      setMegrendelok(data);
    } catch (error) {
      console.error('Error fetching megrendelok:', error);
    }
  };

  const fetchHibatipusok = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/hibatipusok/');
      const data = await response.json();
      setHibatipusok(data);
    } catch (error) {
      console.error('Error fetching hibatipusok:', error);
    }
  };

  const fetchMunkalap = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/munkalapok/${munkalapId}/`);
      const data = await response.json();
      // Csak az azonosítókat mentjük el, az enum értékeket a frontend oldalon alakítjuk át érthető formátumra
      const { megrendelo_id, datum, munkalapstatusz, munkalapszam, kmoraallas, uzemenyagszint, hibatipus_id, hibaleiras, varhatohatarido, elvegzettmunka, felhasznaltanyag } = data;
      setMunkalap({
        megrendelo_id: megrendelo_id.id,
        datum,
        munkalapstatus: enumToReadable[munkalapstatusz],
        munkalapszam,
        kmoraallas,
        uzemenyagszint: enumToReadable2[uzemenyagszint],
        hibatipus_id: hibatipus_id.id,
        hibaleiras,
        varhatohatarido,
        elvegzettmunka,
        felhasznaltanyag
      });
    } catch (error) {
      console.error('Error fetching munkalap:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMunkalap({ ...munkalap, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (munkalapId) {
        await fetch(`http://localhost:8000/api/munkalapok/${munkalapId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(munkalap),
        });
      } else {
        await fetch('http://localhost:8000/api/munkalapok/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(munkalap),
          
        });
        
      }
      console.log('POST request data:', munkalap); // Log data here
      // Redirect or do something after successful form submission
    } catch (error) {
      console.error('Error submitting munkalap form:', error);
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Megrendelő:</label>
      <select name="megrendelo_id" value={munkalap.megrendelo_id} onChange={handleChange}>
        <option value="">Válasszon megrendelőt...</option>
        {megrendelok.map(megrendelo => (
          <option key={megrendelo.id} value={megrendelo.id}>{megrendelo.nev}</option>
        ))}
      </select>
      
      <label>Munkalap státusz:</label>
      <select name="munkalapstatus" value={munkalap.munkalapstatusz} onChange={handleChange}>
        <option value="enum_value_1">Aktív</option>
        <option value="enum_value_2">Lezárt</option>
      </select>
      <label>Munkalap száma:</label>
      <input type="text" name="munkalapszam" value={munkalap.munkalapszam} onChange={handleChange} />
      <label>Km-óra állás:</label>
      <input type="number" name="kmoraallas" value={munkalap.kmoraallas} onChange={handleChange} />
      <label>Üzemanyagszint:</label>
      <select name="uzemenyagszint" value={munkalap.uzemenyagszint} onChange={handleChange}>
        <option value="enum_value_1">Negyed</option>
        <option value="enum_value_2">Fél</option>
        <option value="enum_value_3">Háromnegyed</option>
        <option value="enum_value_4">Tele</option>
      </select>
      <label>Hibatípus:</label>
      <select name="hibatipus_id" value={munkalap.hibatipus_id} onChange={handleChange}>
        <option value="">Válasszon hibatípust...</option>
        {hibatipusok.map(hibatipus => (
          <option key={hibatipus.id} value={hibatipus.id}>{hibatipus.hiba}</option>
        ))}
      </select>
      <label>Hiba leírása:</label>
      <input type="text" name="hibaleiras" value={munkalap.hibaleiras} onChange={handleChange} />
      <label>Várható határidő:</label>
      <input type="date" name="varhatohatarido" value={munkalap.varhatohatarido} onChange={handleChange} />
      <label>Elvégzett munka:</label>
      <input type="text" name="elvegzettmunka" value={munkalap.elvegzettmunka} onChange={handleChange} />
      <label>Felhasznált anyagok:</label>
      <input type="text" name="felhasznaltanyag" value={munkalap.felhasznaltanyag} onChange={handleChange} />
      <button type="submit">Mentés</button>
    </form>
  );
}

export default MunkalapForm;



