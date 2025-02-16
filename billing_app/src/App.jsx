import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BillingTable from "./BillingTable"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <div className="App">
      <h1 className="text-center p-4 text-xl font-bold">Billing System</h1>
      <BillingTable />
    </div>
    </>
  )
}

export default App
