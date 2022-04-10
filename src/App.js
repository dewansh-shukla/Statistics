import { useState } from 'react'
import styled from 'styled-components'

const data = [
  {
    numbers: [123, 344, 555],
  },
  {
    numbers: [12, 34, 23, 56, 23],
  },
  {
    numbers: [1, 1, 2, 3, 5, 5, 5, 5],
  },
  {
    numbers: [2, 6, 7, 3, 123],
  },
  {
    numbers: [5, 5, 5, 5, 5, 5],
  },
  {
    numbers: [1, 1, 2, 3, 5, 5, 5, 5],
  },
  {
    numbers: [0],
  },
]

function App() {
  const [index, setIndex] = useState(0)
  const [value, setValue] = useState(0)
  const [mean, setMean] = useState(0)
  const [median, setMedian] = useState(0)
  const [mode, setMode] = useState(0)
  const [deviation, setDeviation] = useState(0)
  const calculate = () => {
    var arr = data[index].numbers
    arr.sort(function (a, b) {
      return a - b
    })
    console.log(arr)
    //Mean
    var total = 0
    for (var i = 0; i < arr.length; i += 1) {
      total = total + arr[i]
    }
    setMean((total / arr.length).toFixed(2))
    //Median
    var half = Math.floor(arr.length / 2)
    if (arr.length % 2) {
      setMedian(arr[half])
    } else setMedian(arr[half - 1] + arr[half] / 2)

    //Standard Deviation
    var arr2 = []
    for (i = 0; i < arr.length; i++) {
      arr2.push(Math.pow(arr[i] - mean, 2))
    }
    setDeviation(
      Math.sqrt(
        arr2.reduce(function (a, b) {
          return a + b
        }) / arr.length
      ).toFixed(2)
    )

    //Mode
    var mode = 0
    for (i = 0; i < arr.length; i++) {
      for (var j = 0; j < i; j++) {
        if (arr[j] === arr[i]) {
          mode = arr[j]
        }
      }
    }
    setMode(mode)

    setIndex(index + 1)
  }
  const addValue = () => {
    setMean(Number(mean) + Number(value))
    setMedian(Number(median) + Number(value))
    setDeviation(Number(median) + Number(value))
    setMode(Number(mode) + Number(value))
  }
  return (
    <Wrapper>
      <Container>
        <Header>Statistics</Header>
        {index <= 6 ? (
          <>
            <Table>
              <Row>
                <Text>Mean</Text>
                <Data>{mean}</Data>
              </Row>
              <Row>
                <Text>Median</Text>
                <Data>{median}</Data>
              </Row>
              <Row>
                <Text>Standard Deviation</Text>
                <Data>{deviation}</Data>
              </Row>
              <Row>
                <Text>Mode</Text>
                <Data>{mode}</Data>
              </Row>
            </Table>
            <Button onClick={calculate}>Next</Button>
            <InputArea>
              <Input
                type='number'
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button onClick={addValue}>Add</Button>
            </InputArea>
          </>
        ) : (
          <>
            <Header>End of Data</Header>
          </>
        )}
      </Container>
    </Wrapper>
  )
}

export default App

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
`
const Container = styled.div`
  width: 50%;
  height: 50%;
  background: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 15px;
`
const Header = styled.p`
  font-weight: 900;
  font-size: 30px;
  margin: 10px;
  letter-spacing: 3px;
`
const Text = styled.text`
  font-weight: 600;
`
const Table = styled.table`
  width: 40%;
  margin-top: 20px;
`
const Row = styled.tr``
const Data = styled.td``

const Button = styled.button`
  border: 0;
  background: linear-gradient(45deg, #e523ff, #4548ff);
  padding: 10px;
  width: 100px;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  margin: 5px;
  &:hover {
    cursor: pointer;
  }
  &:active {
    opacity: 0.8;
  }
`
const InputArea = styled.div``

const Input = styled.input`
  width: 50px;
`
