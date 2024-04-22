import React, { useEffect, useState } from 'react'


const AllSheet = () => {
  const [apiData, setApiData] = useState()

  useEffect(()=>{
    fetch('http://localhost:8000/api/munkalapOsszes')
    .then(res => res.json())
    .then(data => setApiData(data))
  }, [])

  return (
    <div id="allsheet">
        <h2>Összes munkalap</h2>
        <div className="cards">
            {
            apiData ?
            apiData.map((data, idx) => <AllSheetCard key={idx} {...data} />) :
            <div>Adatok betöltése...</div>
            }
        </div>
    </div>
  )
}
export default AllSheet

const AllSheetCard = (props) => {

    const viewButton = () => {
        console.log("kattintottam")
    }

    return (
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