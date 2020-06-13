import React, { useState, useEffect } from 'react';
import './Squad.css';

//Services 
import footballAPI from '../../services/footballAPI';

//Components
import GKTable from '../GKTable/GKTable';
import DefTable from '../DefTable/DefTable';
import MidTable from '../MidTable/MidTable';
import AttTable from '../AttTable/AttTable';

const Squad = ({ playerStats }) => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    footballAPI.getCountries()
      .then(countries => setCountries(countries))
  }, [])

  const getFlags = () => {
    let flags = {}
    for (let i = 0; i < countries.length; i++) {
      flags[countries[i].country] = countries[i].flag 
    }
    console.log(flags);
    return flags;
  }

  return (
    <div className="Squad">
      <h2>Goalkeepers</h2>
      <GKTable flags={getFlags()} goalkeepers={playerStats.filter(player => player.position === 'Goalkeeper')} />
      <br />

      <h2>Defenders</h2>
      <DefTable flags={getFlags()} defenders={playerStats.filter(player => player.position === 'Defender')}/>
      <br /> 

      <h2>Midfielders</h2>
      <MidTable flags={getFlags()} midfielders={playerStats.filter(player => player.position === 'Midfielder')} />
      <br />

      <h2>Attackers</h2>
      <AttTable flags={getFlags()} attackers={playerStats.filter(player => player.position === 'Attacker')} />
    </div>
  );
}

export default Squad;
