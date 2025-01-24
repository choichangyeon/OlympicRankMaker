import { useEffect, useState } from "react";
import Input from "./Input";
import DropDown from "./DropDown";
import RadioBtn from "./RadioBtn";

//사용자 폼 컴포넌트
const InputForm = ({ countries, setCountries, heads, head, setHead }) => {
  //국가 정보 state
  const [information, setInfo] = useState({
    country: INITIAL_VAL,
    gold: INITIAL_VAL,
    sliver: INITIAL_VAL,
    bronze: INITIAL_VAL,
  });

  //국가 목록 수정될 때 마다 로컬 스토리지 저장
  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(countries));
  }, [countries]);

  //입력 초기화 함수
  const resetInput = () => {
    setInfo({
      country: INITIAL_VAL,
      gold: INITIAL_VAL,
      sliver: INITIAL_VAL,
      bronze: INITIAL_VAL,
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

    if (preventMedal()) {
      alert("메달을 입력해주세요!");
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

    if (preventMedal()) {
      alert("메달을 입력해주세요!");
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

  //메달 미입력 예방 함수
  const preventMedal = () => {
    return (
      typeof information.gold === "string" ||
      typeof information.sliver === "string" ||
      typeof information.bronze === "string" ||
      false
    );
  };

  return (
    <>
      <form style={formStyle} onSubmit={eventHandler}>
        <Input
          label="국가명"
          type={INPUT_TYPE.TEXT}
          name={INPUT_NAME.COUNTRY}
          value={information.country}
          onChange={(e) => setInfo({ ...information, country: e.target.value })}
          placeholder="국가 입력"
        />
        <Input
          label="금메달"
          type={INPUT_TYPE.NUMBER}
          name={INPUT_NAME.GOLD}
          value={information.gold}
          onChange={(e) =>
            setInfo({ ...information, gold: Number(e.target.value) })
          }
          placeholder="금메달 개수"
          min="0"
        />
        <Input
          label="은메달"
          type={INPUT_TYPE.NUMBER}
          name={INPUT_NAME.SLIVER}
          value={information.sliver}
          onChange={(e) =>
            setInfo({ ...information, sliver: Number(e.target.value) })
          }
          placeholder="은메달 개수"
          min="0"
        />
        <Input
          label="동메달"
          type={INPUT_TYPE.NUMBER}
          name={INPUT_NAME.BRONZE}
          value={information.bronze}
          onChange={(e) =>
            setInfo({ ...information, bronze: Number(e.target.value) })
          }
          placeholder="동메달 개수"
          min="0"
        />
        <Input
          value="추가하기"
          name={EVENT_TYPE.ADD}
          type={INPUT_TYPE.SUBMIT}
          style={submitStyle}
        />
        <Input
          value="업데이트"
          name={EVENT_TYPE.UPDATE}
          type={INPUT_TYPE.SUBMIT}
          style={submitStyle}
        />
        <RadioBtn heads={heads} setValue={setHead}></RadioBtn>
        <DropDown
          label={"정렬기준"}
          heads={heads}
          setValue={setHead}
          state={head}
        />
      </form>
    </>
  );
};

const formStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  height: "100px",
  gap: "25px",
};

const submitStyle = {
  display: "flex",
  width: "80px",
};

const LOCAL_STORAGE_KEY = "countries";
const INITIAL_VAL = "";
const EVENT_TYPE = {
  ADD: "add",
  UPDATE: "update",
};
const INPUT_TYPE = {
  TEXT: "text",
  NUMBER: "number",
  SUBMIT: "submit",
};
const INPUT_NAME = {
  COUNTRY: "country",
  GOLD: "gold",
  SLIVER: "sliver",
  BRONZE: "bronze",
};
// const COUNTRY_LIST = ["가나", "가봉", "가이아나", "감비아", "개인 중립", "과테말라", "괌", "그레나다",
//   "그리스", "기니", "기니비사우", "나미비아", "나우루", "나이지리아", "난민", "남수단",
//   "남아프리카 공화국", "네덜란드", "네팔", "노르웨이", "뉴질랜드", "니제르", "니카라과",
//   "대한민국", "덴마크", "도미니카 공화국", "도미니카 연방", "독일", "동티모르", "라오스",
//   "라이베리아", "라트비아", "레바논", "레소토", "루마니아", "룩셈부르크", "르완다", "리비아",
//   "리투아니아", "리히텐슈타인", "마다가스카르", "마셜 제도", "말라위", "말레이시아", "말리",
//   "멕시코", "모나코", "모로코", "모리셔스", "모리타니", "모잠비크", "몬테네그로", "몰도바",
//   "몰디브", "몰타", "몽골", "미국", "미국령 버진아일랜드", "미얀마", "미크로네시아 연방",
//   "바누아투", "바레인", "바베이도스", "바하마", "방글라데시", "버뮤다", "베냉", "베네수엘라",
//   "베트남", "벨기에", "벨리즈", "보스니아 헤르체고비나", "보츠와나", "볼리비아", "부룬디",
//   "부르키나파소", "부탄", "북마케도니아", "불가리아", "브라질", "브루나이", "사모아",
//   "사우디아라비아", "산마리노", "상투메 프린시페", "세네갈", "세르비아", "세이셸",
//   "세인트루시아", "세인트빈센트 그레나딘", "세인트키츠 네비스", "소말리아", "솔로몬 제도",
//   "수단", "수리남", "스리랑카", "스웨덴", "스위스", "스페인", "슬로바키아", "슬로베니아",
//   "시리아", "시에라리온", "싱가포르", "아랍에미리트", "아루바", "아르메니아", "아르헨티나",
//   "아메리칸사모아", "아이슬란드", "아이티", "아일랜드", "아제르바이잔", "아프가니스탄",
//   "안도라", "알바니아", "알제리", "앙골라", "앤티가 바부다", "에리트레아", "에스와티니",
//   "에스토니아", "에콰도르", "에티오피아", "엘살바도르", "영국", "영국령 버진아일랜드",
//   "예멘", "오만", "오스트레일리아", "오스트리아", "온두라스", "요르단", "우간다", "우루과이",
//   "우즈베키스탄", "우크라이나", "이라크", "이란", "이스라엘", "이집트", "이탈리아", "인도",
//   "인도네시아", "일본", "자메이카", "잠비아", "적도 기니", "조선민주주의인민공화국",
//   "조지아", "중앙아프리카 공화국", "중화 타이베이", "중화인민공화국", "지부티", "짐바브웨",
//   "차드", "체코", "칠레", "카메룬", "카보베르데", "카자흐스탄", "카타르", "캄보디아",
//   "캐나다", "케냐", "케이맨 제도", "코모로", "코소보", "코스타리카", "코트디부아르",
//   "콜롬비아", "콩고 공화국", "콩고 민주 공화국", "쿠바", "쿠웨이트", "쿡 제도", "크로아티아",
//   "키르기스스탄", "키리바시", "키프로스", "타지키스탄", "탄자니아", "태국", "토고", "통가",
//   "투르크메니스탄", "투발루", "튀니지", "튀르키예", "트리니다드 토바고", "파나마",
//   "파라과이", "파키스탄", "파푸아뉴기니", "팔라우", "팔레스타인", "페루", "포르투갈",
//   "폴란드", "푸에르토리코", "프랑스", "피지", "핀란드", "필리핀", "헝가리", "홍콩"]

export default InputForm;
