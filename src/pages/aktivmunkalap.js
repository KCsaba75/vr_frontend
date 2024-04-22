import React, { useEffect, useState } from 'react'

const ActiveSheet = () => {
  const [apiData, setApiData] = useState()

  useEffect(()=>{
    fetch('http://localhost:8000/api/munkalapAktiv')
    .then(res => res.json())
    .then(data => setApiData(data))
  }, [])

 
  
  return (
    <div id="activesheet">
        <h2>Aktív munkalapok</h2>
        <div className="cards">
            {
            apiData ?
            apiData.map((data, idx) => (<ActiveSheetCard key={idx} {...data} />)) :
            <div>Adatok betöltése...</div>
            }
        </div>
    </div>
  )
}


const ActiveSheetCard = (props) => {

   
  return  (
    <div className='card'>
        <table>
            <tbody>
                <tr>
                <th>Munkalapszám:</th>
                    <th>{props.munkalapszam}</th>
                </tr>
                <tr>
                    <td>Név:</td>
                    <td>{props.megrendelo_id.nev}</td>
                </tr>
                <tr>
                    <td>Státusz:</td>
                    <td className='astatusz'>{props.munkalapstatus}</td>
                </tr>
                <tr>
                    <td>Üzemanyagszint:</td>
                    <td>{props.uzemenyagszint}</td>
                </tr>
                <tr>
                    <td>Hiba:</td>
                    <td>{props.hibatipus_id.hiba}</td>
                </tr>
                <tr>
                    <td>Márka:</td>
                    <td>{props.megrendelo_id.gyartmany}</td>
                </tr>
            </tbody>
        </table>
        <div className='button'>
            <a href={`/viewsheet/${props.id}`}>Megtekintés</a>
        </div>
    </div>
  )
}


export default ActiveSheet