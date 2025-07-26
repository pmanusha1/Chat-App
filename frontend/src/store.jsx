// src/store.jsx
import React, { createContext, useState, useEffect } from 'react'

export const StoreContext = createContext(null)

const StoreProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  return (
    <StoreContext.Provider value={[token, setToken]}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
