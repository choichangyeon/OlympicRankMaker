import React from 'react'
import Title from './Title';
import InputForm from './InputForm';

const App = () => {
  const mainStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5px',
  };

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