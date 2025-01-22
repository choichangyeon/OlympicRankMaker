import React, { useEffect, useState } from 'react'

const App = () => {
  const mainStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '100px',
  };

  return (
    <>
      <body>
        <main style={mainStyle}>
          <Title />
          <InputForm />
        </main >
      </body>
    </>
  )
}

export default App

//Title 컴포넌트
const Title = () => {

  return <h1>2024 파리 올림픽</h1>;
}

//사용자 폼 컴포넌트
const InputForm = () => {

  const formStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '30px'
  };

  //국가 목록 state
  const [countries, setCountries] = useState(() => {
    let initial = JSON.parse(window.localStorage.getItem("countries"));
    return initial;
  });

  //국가 정보 state
  const [country, setCountry] = useState("");
  const [gold, setGold] = useState(0);
  const [sliver, setSliver] = useState(0);
  const [bronze, setBronze] = useState(0);

  //국가 목록 수정될 때 마다 로컬 스토리지 저장
  useEffect(() => {
    window.localStorage.setItem("countries", JSON.stringify(countries))
  }, [countries]);

  //입력 초기화 함수
  const resetInput = () => {
    setCountry("");
    setGold(0);
    setSliver(0);
    setBronze(0);
  }

  //입력 폼 이벤트 핸들러
  const eventHandler = (e) => {
    e.preventDefault();
    if (!preventCountry()) {
      alert("국가를 입력해주세요!");
      return;
    }
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
    const target = countries.find(e => e.country === country);
    if (target) {
      alert("해당 국가가 리스트에 존재합니다.");
    }
    else {
      const newInput = {
        country: country,
        gold: gold,
        sliver: sliver,
        bronze: bronze
      }
      setCountries([...countries, newInput]);
      resetInput();
    }
  }

  //국가 업데이트 함수
  const updateCountry = () => {
    const target = countries.find(e => e.country === country);
    if (target) {
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
    else {
      alert("해당 국가가 존재하지 않습니다.");
    }
  }

  //국가 미입력 예방 함수
  const preventCountry = () => {
    return (country || false);
  }

  return (<>
    <form style={formStyle} onSubmit={eventHandler}>
      국가명
      <Input type="text" name='country' value={country} onChange={e => setCountry(e.target.value)} placeholder='국가 입력' />
      금메달
      <Input type="number" name='gold' value={gold} onChange={e => setGold(e.target.value)} />
      은메달
      <Input type="number" name='sliver' value={sliver} onChange={e => setSliver(e.target.value)} />
      동메달
      <Input type="number" name='bronze' value={bronze} onChange={e => setBronze(e.target.value)} />
      <Button value='추가하기' name='add'></Button>
      <Button value='업데이트' name='update'></Button>
      <Button value='테스트' name='test'></Button>
    </form>
    <Table countries={countries}></Table>
  </>);
}

//사용자 입력 컴포넌트
const Input = ({ type, name, value, onChange, placeholder = null }) => {

  return <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} />
}

//사용자 제출 버튼 컴포넌트
const Button = ({ value, name }) => {
  const buttonStyle = {
    display: 'flex',
    width: '100px'
  };
  return <input type='submit' style={buttonStyle} value={value} name={name} />;
}

//테이블 컴포넌트
const Table = ({ countries }) => {
  const countryStyle = {

  };

  const tableStyle = {

    border: '1px solid black',
  }

  const thStyle = {

  };

  const heads = ["국가", "금메달", "은메달", "동메달"];

  return (<table style={{
    padding: '50px 0 0 0',
    width: '100%',
    // backgroundColor:'green'
  }}>
    <thead>
      <tr>
        {heads.map(head => {
          return <th style={thStyle}>{head}</th>
        })}
      </tr>
    </thead>
    {countries.map(e => {
      return <tbody style={{
        // backgroundColor:'green',
        textAlign: 'center'
      }}>
        <tr>
          <td>{e.country}</td>
          <td>{e.gold}</td>
          <td>{e.sliver}</td>
          <td>{e.bronze}</td>
        </tr>
      </tbody>
    })
    }
  </table>);

}