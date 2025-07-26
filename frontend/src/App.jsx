import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './auth/login'
import Register from './auth/register'
import StoreProvider from './store'
import ChatPage from './chat/ChatPage'

const App = () => {

  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/chat' element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
