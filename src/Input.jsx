import React from "react";

//사용자 입력 컴포넌트
const Input = ({
  label,
  type,
  name,
  value,
  onChange = null,
  placeholder = null,
  min = null,
  style = null
}) => {
  return (
    <>
      {label && <label>{label}</label>}
      <input
        style={style}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
      />
    </>
  );
};

export default Input;