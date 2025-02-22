import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./NavBar"
import Login from "./Login"
import Body from "./Body"

function App() {


  return (
    <>
      <BrowserRouter basename= "/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<div>HELOOOO from SIGNUP</div>}/>

          </Route>
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
