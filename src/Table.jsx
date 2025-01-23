import React from 'react'

//테이블 컴포넌트
const Table = ({ countries, setCountries, heads }) => {
    const countryStyle = {

    };

    const tableStyle = {

        border: '1px solid black',
    }

    const thStyle = {

    };
    //국가 삭제 함수
    const delCountry = (e) => { // 비효율적 고민하고 줄이기
        const target = e.target.value
        const newCountries = countries.filter(e => e.country !== target).map(e => e); //map 필요없음
        if (newCountries.length === 0) {
            setCountries([]);
        }
        else { setCountries([...newCountries]); }
    }



    return (
        (countries.length !== 0) ? <table style={{// 0이 아니란 표현보다 다른 걸로 고쳐서
            padding: '50px 0 0 0',
            width: '1000px',
            // backgroundColor:'green'
        }}>
            <thead>
                <tr>
                    {heads.map(head => {
                        return <th key={head} style={thStyle}>{head}</th>
                    })}
                </tr>
            </thead>
            {countries.map(e => {
                return <tbody key={e.country} style={{
                    // backgroundColor:'green',
                    textAlign: 'center'
                }}>
                    <tr>
                        <td>{e.country}</td>
                        <td>{e.gold}</td>
                        <td>{e.sliver}</td>
                        <td>{e.bronze}</td>
                        <td><button value={e.country} onClick={delCountry}>삭제</button></td>
                    </tr>
                </tbody>
            })
            }
        </table> : <div style={{
            padding: '200px'
        }}>국가가 존재하지 않습니다. 추가해주세요!</div>
    );

}

export default Table