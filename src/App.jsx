import {useState} from 'react'
import axios from 'axios'
import logo from './logo-framework.png'
import './App.css'

function App() {
  const [divisibleNumbers, setDivisibleNumbers] = useState([])
  const [primeNumbers, setPrimeNumbers] = useState([])

  const [number, setNumber] = useState(0)

  const getDivisibleNumbers = async () => {
    let {data} = await axios.post('http://localhost:3002/api/divisible-number', {number})

    let primeNumbers = data.filter(number => number.primos)

    let divisibleNumbers = data.filter(number => number.divisores)

    setPrimeNumbers(primeNumbers)
    setDivisibleNumbers(divisibleNumbers)
  }

  const handlerValue = ({target: {value}}) => {
    console.log('vale', value)

    setNumber(value)
  }

  console.log('val::', number)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div>
          <label>
            Valor:
            <input type="number" value={number} onChange={handlerValue} />
          </label>
          <button onClick={getDivisibleNumbers}>Gerar </button>
        </div>
        {divisibleNumbers.length > 0 && (
          <div>
            {divisibleNumbers.map(number => (
              <div>
                <ul>Divisores: {number.divisores}</ul>
              </div>
            ))}
          </div>
        )}

        {primeNumbers.length > 0 && (
          <div>
            {primeNumbers.map(number => (
              <div>
                <ul>Primos: {number.primos}</ul>
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  )
}

export default App
