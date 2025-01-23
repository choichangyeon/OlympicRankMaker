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

    const test = (e) => {
        const target = e.target.value
        const newCountries = countries.filter(e => e.country !== target).map(e => e);
        if (newCountries.length === 0) {
            setCountries(null);
        }
        else { setCountries([...newCountries]); }
    }



    return (
        (countries) ? <table style={{
            padding: '50px 0 0 0',
            width: '100%',
            // backgroundColor:'green'
        }}>
            <thead>
                <tr>
                    {heads.map(head => {
                        return <th style={thStyle}>{head}</th>
                    })}
                </tr>
            </thead>
            {countries.map(e => {
                return <tbody style={{
                    // backgroundColor:'green',
                    textAlign: 'center'
                }}>
                    <tr>
                        <td>{e.country}</td>
                        <td>{e.gold}</td>
                        <td>{e.sliver}</td>
                        <td>{e.bronze}</td>
                        <button value={e.country} onClick={test}>삭제</button>
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