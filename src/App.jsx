import React from 'react'
import Title from './Title';
import InputForm from './InputForm';

const mainStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '5px',
};

const App = () => {

  return (
    <>
      <body>
        <main style={mainStyle}>
          <Title />
          <InputForm />
        </main >
      </body>
    </>
  )
}

export default App