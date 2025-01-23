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

    const delCountry = (e) => {
        const target = e.target.value
        const newCountries = countries.filter(e => e.country !== target).map(e => e);
        if (newCountries.length === 0) {
            setCountries([]);
        }
        else { setCountries([...newCountries]); }
    }



    return (
        (countries.length !== 0) ? <table style={{
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