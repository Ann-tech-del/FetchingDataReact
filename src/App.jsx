import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [advice, setAdvice] = useState("")
  const [error, setError] = useState("")
  const [loading,setLoading] =useState(false)
  async function getAdvice (){
    setLoading(true);
    setError("");
    try {
      const response = await fetch ("https://api.adviceslip.com/advice")
      if (!response.ok){
        setError("Something went wrong!")
        return
      }
      const data = await response.json()
      setAdvice(data.slip.advice)
    }catch (_e){
      setError("something went wrong")
    }

    finally {
      setLoading(false);
    }
  }
useEffect(()=>{
  getAdvice()
}, [])
  return (
    <>
      <h1 className='title'>Get a Random Advice</h1>
      { error ? <p>{error}</p> : <p className="advice">{advice}</p>}
     <button onClick={getAdvice} disabled={loading}>
        {loading ? "Loading..." : "Get  Advice"}
      </button>
    </>
  )
}

export default App
