import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import OurApp from '../public/components/OurApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <OurApp/>
    </>
  )
}

export default App
