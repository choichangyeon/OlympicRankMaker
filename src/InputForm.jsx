import React, { useEffect, useState } from 'react'
import Input from './Input';
import Submit from './Submit';
import DropDown from './DropDown';
import Table from './Table';

//사용자 폼 컴포넌트
const InputForm = () => {
    const formStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '25px'
    };

    //국가 목록 state
    const [countries, setCountries] = useState(() => {
        let initial = JSON.parse(window.localStorage.getItem("countries"));
        return initial || null;
    });

    //국가 정보 state
    const [country, setCountry] = useState("");
    const [gold, setGold] = useState(0);
    const [sliver, setSliver] = useState(0);
    const [bronze, setBronze] = useState(0);

    //정렬 기준 state
    const [head, setHead] = useState("국가");

    //table head 목록
    const heads = ["국가", "금메달", "은메달", "동메달"];

    // const [information, setInfo] = useState({
    //   country:"",
    //   gold:0,
    //   sliver:0,
    //   bronze:0
    // });



    //국가 목록 수정될 때 마다 로컬 스토리지 저장
    useEffect(() => {
        window.localStorage.setItem("countries", JSON.stringify(countries))
    }, [countries]);

    //입력 초기화 함수
    const resetInput = () => {
        setCountry("");
        setGold(0);
        setSliver(0);
        setBronze(0);
    }

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
            case "sort":
                sortByHead();
                break;
            default:
                break;
        }
    }

    //국가 추가 시 작동하는 함수
    const addCountry = () => {
        if (!preventCountry()) {
            alert("국가를 입력해주세요!");
            return;
        }
        else {
            let target
            countries ? target = countries.find(e => e.country === country) : null;
            if (target) {
                alert("해당 국가가 리스트에 존재합니다.");
            }
            else {
                const newInput = {
                    country: country,
                    gold: gold,
                    sliver: sliver,
                    bronze: bronze
                }
                countries ? setCountries([...countries, newInput]) : setCountries([newInput]);
                resetInput();
            }
        }

    }

    //국가 업데이트 함수
    const updateCountry = () => {
        if (!preventCountry()) {
            alert("국가를 입력해주세요!");
            return;
        }
        else {
            let target
            countries ? target = countries.find(e => e.country === country) : null;
            if (target) {
                const newCountries = countries.filter(e => e.country !== target.country).map(e => e);
                const newInput = {
                    country: country,
                    gold: gold,
                    sliver: sliver,
                    bronze: bronze
                }
                setCountries([...newCountries, newInput]);
                resetInput();
            }
            else {
                alert("해당 국가가 존재하지 않습니다.");
            }
        }

    }

    //기준으로 정렬 함수
    const sortByHead = () => {
        if (!countries) {
            alert("국가를 추가해주세요!");
            return;
        }
        let sortCountries = countries;
        switch (head) {
            case "국가":
                sortCountries.sort((a, b) => {
                    return a.country.localeCompare(b.country);
                });
                setCountries([...sortCountries]);
                break;
            case "금메달":
                sortCountries.sort((a, b) => {
                    return b.gold - a.gold;
                });
                setCountries([...sortCountries]);
                break;
            case "은메달":
                sortCountries.sort((a, b) => {
                    return b.sliver - a.sliver;
                });
                setCountries([...sortCountries]);
                break;
            case "동메달":
                sortCountries.sort((a, b) => {
                    return b.bronze - a.bronze;
                });
                setCountries([...sortCountries]);
                break;

            default:
                break;
        }
    }

    //국가 미입력 예방 함수
    const preventCountry = () => {
        return (country || false);
    }

    return (<>
        <form style={formStyle} onSubmit={eventHandler}>
            국가명
            <Input type="text" name='country' value={country} onChange={e => setCountry(e.target.value)} placeholder='국가 입력' />
            금메달
            <Input type="number" name='gold' value={gold} onChange={e => setGold(e.target.value)} min='0' />
            은메달
            <Input type="number" name='sliver' value={sliver} onChange={e => setSliver(e.target.value)} min='0' />
            동메달
            <Input type="number" name='bronze' value={bronze} onChange={e => setBronze(e.target.value)} min='0' />
            <Submit value='추가하기' name='add' />
            <Submit value='업데이트' name='update' />
            <Submit value='정렬하기' name='sort' />
            <DropDown heads={heads} setHead={setHead} state={head} />
        </form>
        <Table countries={countries} heads={heads}></Table>
    </>);
}

export default InputForm