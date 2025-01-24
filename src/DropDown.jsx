import React from "react";

//드롭다운 컴포넌트
const DropDown = ({ label, heads, setValue, state }) => {
  //필터 값 설정 함수
  const valueSelect = (e) => {
    setValue(e.target.value);
  };

  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      fontSize:"13px"
    }}>
      <label>{label}</label>
      <select onChange={valueSelect} value={state}>
        {heads.map((head) => {
          return <option key={head}>{head}</option>;
        })}
      </select>
    </div>
  );
};

export default DropDown;
