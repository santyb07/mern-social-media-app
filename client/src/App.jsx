import React from 'react'
import {Container} from "@mui/material"
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom"
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails'

import Navbar from './components/Navbar/Navbar'

 const App = () => {
  const user= JSON.parse(localStorage.getItem('profile'));


  return (
    <Router>
      <Container maxWidth="xl">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Navigate replace to='/posts'/>}></Route>
        <Route path='/posts' element={<Home/>}></Route>
        <Route path='/posts/search' element={<Home/>}></Route>
        <Route path='/posts/:id' element={<PostDetails/>}></Route>
        <Route path='/auth' element={user ? (<Navigate replace to='/posts'/>):(<Auth/>)}/>
      </Routes>
    </Container>
    </Router>
    
  )
}
export default App;