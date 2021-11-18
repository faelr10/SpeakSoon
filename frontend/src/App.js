import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import Container from './components/layout/Container'

import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Home from './components/pages/Home'
import { UserProvider } from './context/UserContext';
import Dashboard from './components/pages/Dashboard'


function App() {

  function handleSubmit(e){
    e.preventDefault()
    
}

  return (

    <Router>
      <UserProvider>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route onSubmit={handleSubmit} path="/dashboard" element={<Dashboard/>} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
        <Footer />
        </UserProvider>
    </Router>

  )
}

export default App