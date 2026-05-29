import { Route,Routes } from "react-router-dom"
import Navbar from "./component/Navbar"
import Home from "./component/Home"
import SignUp from "./component/SignUp"
import Login from "./component/Login"
import Add from "./component/Add"
import Update from "./component/Update"


function App() {
  

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/SignUp" element={<SignUp/>}/>
       <Route path="/login" element={<Login/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/update/:id" element={<Update/>}/>
    </Routes>
    </>
  )
}

export default App
