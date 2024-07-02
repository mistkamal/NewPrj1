import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import login from './pages/login'
import register from './pages/register'

import { useStore } from '../src/store'

function App() {
  const {loggedIn}:any = useStore()
  console.log('from app.tsx : ' + loggedIn)
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home}></Route>
        <Route path='/login' Component={login}></Route>
        <Route path='/register' Component={register}></Route>
      </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
