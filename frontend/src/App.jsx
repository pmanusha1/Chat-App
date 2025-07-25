import './App.css'
import { useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './auth/login'
import Register from './auth/register'
import MyProfile from './auth/myprofile'
import { store } from './store'

const App = () => {

  const [token, setToken] = useState(null);

  return (
    <store.Provider value={[token, setToken]}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/myprofile' element={<MyProfile />} />
        </Routes>
      </BrowserRouter>
    </store.Provider>
  )
}

export default App
