import React from "react";

//사용자 입력 컴포넌트
const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder = null,
  min = null,
}) => {
  return (
    <>
      {label && <label>{label}</label>}
      <input
        style={{
          height: "20px",
        }}
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