import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import About from './pages/about'
import ColorChanger from './components/bg-changer'
import Counter from './components/counter'
import Timer from './components/timer'
import ToDo from './components/todo'
import Navbar from './pages/navbar'
import ProtectedRoute from './pages/protectedroute'
import Features from './pages/features'
import Contact from './pages/contact'
import Calculator from './components/calculator'

function App() {

  return (
    <>
      <Navbar />
      <main className="pt-10 ">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<About />} />
          <Route path='/features' element={<Features />} />
          <Route path='/contact' element={<Contact />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/bg-changer' element={<ColorChanger />} />
            <Route path='/counter' element={<Counter />} />
            <Route path='/timer' element={<Timer />} />
            <Route path='/todo' element={<ToDo />} />
            <Route path='/calculator' element={<Calculator />} />
          </Route>
        </Routes>
      </main>
    </>
  )
}
export default App