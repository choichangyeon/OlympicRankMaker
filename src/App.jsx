import React, { useState } from 'react'

const App = () => {
  const mainStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '100px',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '30px'
  };

  const buttonStyle = {
    display: 'flex',
    gap: '10px'
  };

  //국가 목록 state
  const [countries, setCountries] = useState([]);

  //국가 정보 state
  const [country, setCountry] = useState("");
  const [gold, setGold] = useState(0);
  const [sliver, setSliver] = useState(0);
  const [bronze, setBronze] = useState(0);
  

  //국가 추가 시 작동하는 함수
  const addCountry = () => {
    const newInput = {
      country:country,
      gold:gold,
      sliver:sliver,
      bronze:bronze
    }
    setCountries([...countries, newInput]);
  }

  const test = () => {
    console.log(countries);
  }
  

  return (
    <>
      <body>
        <main style={mainStyle}>
          <h1>2024 파리 올림픽</h1>
          <div style={formStyle}>
            <p>
              국가명
              <br />
              <input type="text" value={country} onChange={e => setCountry(e.target.value)}/>
            </p>
            <p>
              금메달
              <br />
              <input type="number" value={gold} onChange={e => setGold(e.target.value)}/>
            </p>
            <p>
              은메달
              <br />
              <input type="number" value={sliver} onChange={e => setSliver(e.target.value)}/>
            </p>
            <p>
              동메달
              <br />
              <input type="number" value={bronze} onChange={e => setBronze(e.target.value)}/>
            </p>
            <p style={buttonStyle}>
              <button onClick={addCountry}>국가 추가</button>
              <button onClick={test}>업데이트</button>
            </p>
          </div>
        </main >
      </body>
    </>
  )
}

export default App