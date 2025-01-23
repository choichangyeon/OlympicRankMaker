import { useEffect, useState } from "react";
import Input from "./Input";
import DropDown from "./DropDown";
import SubmitBtn from "./SubmitBtn";

const LOCAL_STORAGE_KEY = "countries";
const EVENT_TYPE = {
  ADD: "add",
  UPDATE: "update",
};

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
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(countries));
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
      case EVENT_TYPE.ADD:
        addCountry();
        break;
      case EVENT_TYPE.UPDATE:
        updateCountry();
        break;
      default:
        break;
    }
  };

  //국가 추가 시 작동하는 함수 - 초기 상태 처리
  const addCountry = () => {
    if (!preventCountry()) {
      alert("국가를 입력해주세요!");
      return;
    }

    let target = countries.find((e) => e.country === information.country);

    if (target) {
      alert("해당 국가가 리스트에 존재합니다.");
      return;
    }

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
      alert("해당 국가가 존재하지 않습니다.");
      return;
    }

    const newCountries = countries.filter((e) => e.country !== target.country);
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
        <Input
          label="국가명"
          type="text"
          name="country"
          value={information.country}
          onChange={(e) => setInfo({ ...information, country: e.target.value })}
          placeholder="국가 입력"
        />
        <Input
          label="금메달"
          type="number"
          name="gold"
          value={information.gold}
          onChange={(e) =>
            setInfo({ ...information, gold: Number(e.target.value) })
          }
          min="0"
        />
        <Input
          label="은메달"
          type="number"
          name="sliver"
          value={information.sliver}
          onChange={(e) =>
            setInfo({ ...information, sliver: Number(e.target.value) })
          }
          min="0"
        />
        <Input
          label="동메달"
          type="number"
          name="bronze"
          value={information.bronze}
          onChange={(e) =>
            setInfo({ ...information, bronze: Number(e.target.value) })
          }
          min="0"
        />
        <SubmitBtn value="추가하기" name={EVENT_TYPE.ADD} />
        <SubmitBtn value="업데이트" name={EVENT_TYPE.UPDATE} />
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
