import { useState } from "react";
import Title from "./Title";
import InputForm from "./InputForm";
import Table from "./Table";

const App = () => {
  //국가 목록 state
  let initial = JSON.parse(window.localStorage.getItem("countries"));
  const [countries, setCountries] = useState(initial || []);

  //정렬 기준 state
  const [head, setHead] = useState("국가");

  //table head 목록
  const heads = ["국가", "금메달", "은메달", "동메달"];

  return (
    <>
      <main style={mainStyle}>
        <Title />
        <InputForm
          countries={countries}
          setCountries={setCountries}
          heads={heads}
          head={head}
          setHead={setHead}
        />
        <Table
          countries={sortByHead(countries, head) ?? countries}
          setCountries={setCountries}
          heads={heads}
        ></Table>
      </main>
    </>
  );
};

//기준으로 정렬 함수
const sortByHead = (countries, head) => {
  let sortCountries = [...countries];
  switch (
    head
  ) {
    case "금메달":
      sortCountries.sort((a, b) => {
        return b.gold - a.gold;
      });
      return sortCountries;
    case "은메달":
      sortCountries.sort((a, b) => {
        return b.sliver - a.sliver;
      });
      return sortCountries;
    case "동메달":
      sortCountries.sort((a, b) => {
        return b.bronze - a.bronze;
      });
      return sortCountries;
    default:
      sortCountries.sort((a, b) => {
        return a.country.localeCompare(b.country);
      });
      return sortCountries;
  }
};

const mainStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "5px",
};

export default App;
