import React, { useEffect, useState } from "react"; //React 뺴기
import Input from "./Input";
import Submit from "./Submit";
import DropDown from "./DropDown";

//사용자 폼 컴포넌트
const InputForm = ({ countries, setCountries, heads, head, setHead }) => {
  //국가 정보 state
  const [information, setInfo] = useState({
    country: "",
    gold: 0,
    sliver: 0,
    bronze: 0,
  });

  //국가 목록 수정될 때 마다 로컬 스토리지 저장
  useEffect(() => {
    window.localStorage.setItem("countries", JSON.stringify(countries)); //하드코딩된 내용은 상수로 변경
  }, [countries]);

  //입력 초기화 함수
  const resetInput = () => {
    setInfo({
      country: "",
      gold: 0,
      sliver: 0,
      bronze: 0,
    });
  };

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
  };

  //국가 추가 시 작동하는 함수 - 초기 상태 처리
  const addCountry = () => {
    if (!preventCountry()) {
      //한줄짜리는 가독성을 생각햇을 때 그냥 작성해도 괜찮다 but 기준이 명확히 있으면 좋겠다
      alert("국가를 입력해주세요!");
      return;
    }

    let target = countries.find((e) => e.country === information.country);

    if (target) {
      alert("해당 국가가 리스트에 존재합니다.");
      return;
    }

    console.log(information);

    const newInput = information;
    setCountries([...countries, newInput]);
    resetInput();
  };

  //국가 업데이트 함수 - 초기 상태 처리
  const updateCountry = () => {
    if (!preventCountry()) {
      alert("국가를 입력해주세요!");
      return;
    }

    let target = countries.find((e) => e.country === information.country);

    if (!target) {
      alert("해당 국가가 존재하지 않습니다."); //early return; guard clause - 완
      return;
    }

    const newCountries = countries
      .filter((e) => e.country !== target.country)
      .map((e) => e); //map을 쓸 필요가 없음
    const newInput = information;
    setCountries([...newCountries, newInput]);
    resetInput();
  };

  //국가 미입력 예방 함수
  const preventCountry = () => {
    return information.country || false;
  };

  return (
    <>
      <form style={formStyle} onSubmit={eventHandler}>
        국가명
        <Input
          type="text"
          name="country"
          value={information.country}
          onChange={(e) => setInfo({ ...information, country: e.target.value })}
          placeholder="국가 입력"
        />
        금메달
        <Input
          type="number"
          name="gold"
          value={information.gold}
          onChange={(e) =>
            setInfo({ ...information, gold: Number(e.target.value) })
          }
          min="0"
        />
        은메달
        <Input
          type="number"
          name="sliver"
          value={information.sliver}
          onChange={(e) =>
            setInfo({ ...information, sliver: Number(e.target.value) })
          }
          min="0"
        />
        동메달
        <Input
          type="number"
          name="bronze"
          value={information.bronze}
          onChange={(e) =>
            setInfo({ ...information, bronze: Number(e.target.value) })
          }
          min="0"
        />
        <Submit value="추가하기" name="add" />
        <Submit value="업데이트" name="update" />
        <DropDown heads={heads} setHead={setHead} state={head} />
      </form>
    </>
  );
};

const formStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "25px",
};

export default InputForm;
