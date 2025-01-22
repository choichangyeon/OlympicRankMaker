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
  const [countries, setCountries] = useState([
    {country:"한국", gold:20, sliver:32, bronze:44},
    {country:"미국", gold:20, sliver:32, bronze:44},
    {country:"일본", gold:20, sliver:32, bronze:44},
    {country:"중국", gold:20, sliver:32, bronze:44},
    {country:"영국", gold:20, sliver:32, bronze:44}
  ]);

  //국가 정보 state
  const [country, setCountry] = useState("");
  const [gold, setGold] = useState(0);
  const [sliver, setSliver] = useState(0);
  const [bronze, setBronze] = useState(0);

  //입력 폼 이벤트 핸들러
  const eventHandler = (e) => {
    e.preventDefault();
    const event = e.nativeEvent.submitter.name;
    switch (event) {
      case "add":
        addCountry();
        break;
      case "update":
        updateCountry();
        break;
      default:
        break;
    }
  }

  //국가 추가 시 작동하는 함수
  const addCountry = () => {
    const newInput = {
      country: country,
      gold: gold,
      sliver: sliver,
      bronze: bronze
    }
    setCountries([...countries, newInput]);
    resetInput();
  }

  //입력 초기화 함수
  const resetInput = () => {
    setCountry("");
    setGold(0);
    setSliver(0);
    setBronze(0);
  }

  //국가 업데이트 함수
  const updateCountry = () => {
    const target = countries.find(e => e.country === country);
    if(target){
      console.log(target);
      const newCountries = countries.filter(e => e.country !== target.country).map(e => e);
      const newInput = {
        country: country,
        gold: gold,
        sliver: sliver,
        bronze: bronze
      }
      setCountries([...newCountries, newInput]);
      resetInput();
    }
    else{
      alert("해당 국가가 존재하지 않습니다.");
    }
  }


  return (
    <>
      <body>
        <main style={mainStyle}>
          <h1>2024 파리 올림픽</h1>
          <form style={formStyle} onSubmit={eventHandler}>
            국가명
            <input type="text" name='country' value={country} onChange={e => setCountry(e.target.value)} placeholder='국가 입력' />
            금메달
            <input type="number" name='gold' value={gold} onChange={e => setGold(e.target.value)} />
            은메달
            <input type="number" name='sliver' value={sliver} onChange={e => setSliver(e.target.value)} />
            동메달
            <input type="number" name='bronze' value={bronze} onChange={e => setBronze(e.target.value)} />
            <input type='submit' value="추가하기" name='add' />
            <input type='submit' value="업데이트" name='update' />
          </form>
          <div>
            {countries.map(e => {
              return <p>{e.country} {e.gold} {e.sliver} {e.bronze}</p>
            })
            }
          </div>
        </main >
      </body>
    </>
  )
}

export default App