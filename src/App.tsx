import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import login from './pages/login'
import register from './pages/register'
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route index Component={Home}></Route>
        <Route path='/login' Component={login}></Route>
        <Route path='/register' Component={register}></Route>
      </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
