import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css' 
import { Route, Routes } from 'react-router-dom'
import FillIntheBlanks from './components/FillIntheBlanks'
import Feedback from './components/Feedback' 
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element={<Navbar/>} />
      <Route path="/test" element={<FillIntheBlanks />} />
      <Route path="/feedback" element={<Feedback/>} />
    </Routes>
    </>
  )
}

export default App
