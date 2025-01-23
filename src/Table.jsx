import React from "react";

//테이블 컴포넌트
const Table = ({ countries, setCountries, heads }) => {
  const countryStyle = {};

  const tableStyle = {
    border: "1px solid black",
  };

  const thStyle = {};

  //국가 삭제 함수
  const delCountry = (e) =>
    setCountries([...countries.filter((el) => el.country !== e.target.value)]);

  return countries.length > 0 ? (
    <table
      style={{
        padding: "50px 0 0 0",
        width: "1000px",
      }}
    >
      <thead>
        <tr>
          {heads.map((head) => {
            return (
              <th key={head} style={thStyle}>
                {head}
              </th>
            );
          })}
        </tr>
      </thead>
      {countries.map((e) => {
        return (
          <tbody
            key={e.country}
            style={{
              textAlign: "center",
            }}
          >
            <tr>
              <td>{e.country}</td>
              <td>{e.gold}</td>
              <td>{e.sliver}</td>
              <td>{e.bronze}</td>
              <td>
                <button value={e.country} onClick={delCountry}>
                  삭제
                </button>
              </td>
            </tr>
          </tbody>
        );
      })}
    </table>
  ) : (
    <div
      style={{
        padding: "200px",
      }}
    >
      국가가 존재하지 않습니다. 추가해주세요!
    </div>
  );
};

export default Table;
