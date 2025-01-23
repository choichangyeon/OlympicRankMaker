import React from 'react'

//드롭다운 컴포넌트
const DropDown = ({ heads, setHead, state }) => {
    //필터 값 설정 함수
    const headSelect = (e) => {
        setHead(e.target.value);
    }

    return <select onChange={headSelect} value={state}>{
        heads.map(head => {
            return <option>{head}</option>;
        })
    }</select>;
}

export default DropDown