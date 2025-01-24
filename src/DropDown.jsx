import React from "react";

//드롭다운 컴포넌트
const DropDown = ({ heads, setValue, state }) => {
  //필터 값 설정 함수
  const valueSelect = (e) => {
    setValue(e.target.value);
  };

  return (
    <select onChange={valueSelect} value={state}>
      {heads.map((head) => {
        return <option key={head}>{head}</option>;
      })}
    </select>
  );
};

export default DropDown;
