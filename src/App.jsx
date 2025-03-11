import { BrowserRouter, Routes, Route } from "react-router-dom"


import Login from "./components/Login"
import Body from "./components/Body"
import Feed from "./components/Feed"
import EditProfile from "./components/EditProfile.jsx"
import Connections  from "./components/Connections.jsx"
import Requests from "./components/Requests.jsx"


function App() {


  return (
    <>
        <BrowserRouter basename= "/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/feed" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path= "/profile" element={<EditProfile />} />
              <Route path="/signup" element={<div>HELOOOO from SIGNUP</div>}/>
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
