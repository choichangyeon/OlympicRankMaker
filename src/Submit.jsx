import React from 'react'

//사용자 제출 버튼 컴포넌트
const Submit = ({ value, name }) => {
    const submitStyle = {
      display: 'flex',
      width: '80px'
    };
    return <input type='submit' style={submitStyle} value={value} name={name} />;
  }

export default Submit