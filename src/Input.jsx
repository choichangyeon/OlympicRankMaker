import React from 'react'

//사용자 입력 컴포넌트
const Input = ({ type, name, value, onChange, placeholder = null, min = null }) => {

    return <input style={{
      height: '20px'
    }} type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} min={min} />
  }

  //input - label은 대부분 같이 나온다
  //기존의 input 태그와 다른게 거의 없었다 그렇기 때문에 부가적인 내용을 넣어서 바꿔야 할듯

export default Input