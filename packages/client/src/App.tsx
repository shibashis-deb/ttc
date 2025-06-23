import React, { useState, useEffect } from 'react'
import { testApi } from './api'

function App() {
  const [apiMessage, setApiMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await testApi()
        setApiMessage(data.message || JSON.stringify(data))
      } catch (error) {
        setApiMessage('Error connecting to server')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="app">
      <header>
        <h1>TTC App</h1>
      </header>
      <main className="container">
        <p>Welcome to the minimal fullstack app!</p>
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
          <h2>API Test</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <p>Server response: <strong>{apiMessage}</strong></p>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
