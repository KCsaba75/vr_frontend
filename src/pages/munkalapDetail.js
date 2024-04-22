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
  const munkalapId = match.params.id;

  useEffect(() => {
    fetchMunkalap();
  }, []);

  const fetchMunkalap = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/munkalapok/${munkalapId}/`);
      const data = await response.json();
      setMunkalap(data);
    } catch (error) {
      console.error('Error fetching munkalap:', error);
    }
  };

  if (!munkalap) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Munkalap részletei</h2>
      <p>Munkalap száma: {munkalap.munkalapszam}</p>
      <p>Dátum: {munkalap.datum}</p>
      <p>Megrendelő: {munkalap.megrendelo_id}</p>
      <p>státusz: {enumToReadable[munkalap.munkalapstatus]}</p>
      <p>üzemanyagszint: {enumToReadable2[munkalap.uzemenyagszint]}</p>
      {/* További részletek */}
    </div>
  );
}

export default MunkalapDetail;
