import { useState } from 'react'
import HomePage from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HomePage/>
    </>
  )
}

export default App
