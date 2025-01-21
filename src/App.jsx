import React from 'react'

const App = () => {
  const mainStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '100px',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '30px'
  };

  const buttonStyle = {
    display:'flex',
    gap:'10px'
  };

  return (
    <>
      <body>
        <main style={mainStyle}>
          <h1>2024 파리 올림픽</h1>
          <div style={formStyle}>
            <p>
              국가명
              <br />
              <input type="text" />
            </p>
            <p>
              금메달
              <br />
              <input type="number" />
            </p>
            <p>
              은메달
              <br />
              <input type="number" />
            </p>
            <p>
              동메달
              <br />
              <input type="number" />
            </p>
            <p style={buttonStyle}>
              <button>국가 추가</button>
              <button>업데이트</button>
            </p>
          </div>
        </main >
      </body>
    </>
  )
}

export default App