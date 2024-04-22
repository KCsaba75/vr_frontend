import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const ViewSheet = () => {
    const [apiData, setApiData] = useState()
    const param = useParams()

    useEffect(() => {
        fetch("http://localhost:8000/api/munkalapOsszes/")
            .then(res => res.json())
            .then(data => {

                data.forEach(element => {
                    if (element.id == param.id) {
                        setApiData(element)
                    }
                });

            })
    })

    return (
        <div id="viewsheet">
            <h2>Megtekintés</h2>
            <div className="viewsheetcard">
                {
                    apiData ?
                        <ViewSheetCard {...apiData} /> :
                        <div>Adatok betöltése...</div>
                }
            </div>
        </div>
    )
}
export default ViewSheet

const ViewSheetCard = (props) => {
    const [nev, setNev] = useState(`${props.megrendelo_id.nev}`);
    const [cim, setCim] = useState(`${props.megrendelo_id.cim}`);
    const [email, setEmail] = useState(`${props.megrendelo_id.email}`);
    const [telefon, setTelefon] = useState(`${props.megrendelo_id.telefon}`);
    const [hiba, setHiba] = useState(`${props.hibatipus_id.hiba}`);
    const [rendszam, setRendszam] = useState(`${props.megrendelo_id.rendszam}`);
    const [gyartmany, setGyartmany] = useState(`${props.megrendelo_id.gyartmany}`);
    const [tipus, setTipus] = useState(`${props.megrendelo_id.tipus}`);
    const [gyartasi_ev, setGyartasi_ev] = useState(`${props.megrendelo_id.gyartasi_ev}`);
    const [alvazszam, setAlvazszam] = useState(`${props.megrendelo_id.alvazszam}`);
    const [datum, setDatum] = useState(`${props.datum}`);
    const [munkalapstatusz, setMunkalapstatusz] = useState(`${props.munkalapstatus}`);
    const [munkalapszam, setMunkalapszam] = useState(`${props.munkalapszam}`);
    const [kmoraallas, setKmoraallas] = useState(`${props.kmoraallas}`);
    const [uzemenyagszint, setUzemenyagszint] = useState(`${props.uzemenyagszint}`);
    const [hibaleiras, setHibaleiras] = useState(`${props.hibaleiras}`);
    const [varhatohatarido, setVarhatohatarido] = useState(`${props.varhatohatarido}`);
    const [elvegzettmunka, setElvegzettmunka] = useState(`${props.elvegzettmunka}`);
    const [felhasznaltanyag, setFelhasznaltanyag] = useState(`${props.felhasznaltanyag}`);
    const [ispending, setIspending] = useState(false);
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        const munkalap = {
            nev,
            cim,
            email,
            telefon,
            hiba,
            rendszam,
            gyartmany,
            tipus,
            gyartasi_ev,
            alvazszam,
            datum,
            munkalapstatusz,
            munkalapszam,
            kmoraallas,
            uzemenyagszint,
            hibaleiras,
            varhatohatarido,
            elvegzettmunka,
            felhasznaltanyag
        }

        setIspending(true);

        fetch('http://localhost:8000/db.json', {
            mode:"no-cors",
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(munkalap)
        }).then(() => {
            console.info('Sikeres mentés!');
            setIspending(false);
        })
    }
    return (
        <div id="newsheet">
            <form onSubmit={handleSubmit}>
                <div className="newsheetpart">
                    <h3>Megrendelő</h3>
                    <label>Név: </label>
                    <input type="text" required value={nev} onChange={(e)=>setNev(e.target.value)}/>

                    <label>Cím: </label>
                    <input type="text"  value={cim} onChange={(e)=>setCim(e.target.value)}/>

                    <label>E-mail: </label>
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>

                    <label>Telefon: </label>
                    <input type="text"  value={telefon} onChange={(e)=>setTelefon(e.target.value)}/>
                </div>
                <div className="newsheetpart">
                    <h3>Hibatípus</h3>
                    <label>Hiba: </label>
                    <select value={hiba} onChange={(e)=>setHiba(e.target.value)}>
                        <option value="Fékrendszer">Fékrendszer</option>
                        <option value="Futómű">Futómű</option>
                        <option value="Olajcsere">Olajcsere</option>
                        <option value="Akkumulátor">Akkumulátor</option>
                        <option value="Vezérlés">Vezérlés</option>
                        <option value="Gumiabroncs">Gumiabroncs</option>
                        <option value="Kipufogó">Kipufogó</option>
                        <option value="Diagnosztika">Diagnosztika</option>
                        <option value="Motor">Motor</option>
                        <option value="Klíma">Klíma</option>
                    </select>
                </div>
                <div className="newsheetpart">
                    <h3>Gépjármű</h3>
                    <label>Rendszám: </label>
                    <input type="text"  value={rendszam} onChange={(e)=>setRendszam(e.target.value)}/>

                    <label>Gyártmány: </label>
                    <input type="text"  value={gyartmany} onChange={(e)=>setGyartmany(e.target.value)}/>

                    <label>Típus: </label>
                    <input type="text" value={tipus} onChange={(e)=>setTipus(e.target.value)}/>

                    <label>Gyártási év: </label>
                    <input type="number"  value={gyartasi_ev} onChange={(e)=>setGyartasi_ev(e.target.value)}/>

                    <label>Alvázszám: </label>
                    <input type="text"  value={alvazszam} onChange={(e)=>setAlvazszam(e.target.value)}/>
                </div>
                <div className="newsheetpart">
                    <h3>Munkalap</h3>
                    <label>Dátum: </label>
                    <input type="date"  value={datum} onChange={(e)=>setDatum(e.target.value)}/>

                    <label>Munkalapstátusz: </label>
                    <select required value={munkalapstatusz} onChange={(e)=>setMunkalapstatusz(e.target.value)}>
                        <option value="Aktív">Aktív</option>
                        <option value="Lezárt">Lezárt</option>
                    </select>

                    <label>Munkalapszám: </label>
                    <input type="text" value={munkalapszam} onChange={(e)=>setMunkalapszam(e.target.value)}/>

                    <label>Km-óra: </label>
                    <input type="text"  value={kmoraallas} onChange={(e)=>setKmoraallas(e.target.value)}/>

                    <label>Üzemanyagszint: </label>
                    <select value={uzemenyagszint} onChange={(e)=>setUzemenyagszint(e.target.value)}>
                        <option value="Negyed">Negyed tank</option>
                        <option value="Fél">Fél tank</option>
                        <option value="Tele">Tele tank</option>
                    </select>

                    <label>Hiba leírása: </label>
                    <input type="text"  value={hibaleiras} onChange={(e)=>setHibaleiras(e.target.value)}/>

                    <label>Várható határidő: </label>
                    <input type="date"  value={varhatohatarido} onChange={(e)=>setVarhatohatarido(e.target.value)}/>

                    <label>Elvégzett munka megnevezése: </label>
                    <input type="text"  value={elvegzettmunka} onChange={(e)=>setElvegzettmunka(e.target.value)}/>

                    <label>Felhasznált alkatrészek: </label>
                    <input type="text"  value={felhasznaltanyag} onChange={(e)=>setFelhasznaltanyag(e.target.value)}/>
                </div>
                {!ispending && <button>Módosítás mentése</button>}
                {ispending && <button disabled>Mentés folyamatban...</button>}
                &nbsp;
                <button onClick={() => history.goBack()}>Bezárás</button>
            </form>
        </div>
    )
}