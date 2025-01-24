import React from "react";

const RadioBtn = ({ heads, setValue }) => {
  const valueSelect = (e) => {
    setValue(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <label> [정렬 기준] </label>
      {heads.map((head) => {
        return (
          <>
            <input type="radio" name="sortRadio" value={head} onChange={valueSelect} />
            <label>{head}</label>
          </>
        );
      })}
    </div>
  );
};

export default RadioBtn;
