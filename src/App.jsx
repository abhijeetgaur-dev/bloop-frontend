import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import appStore from "./utils/appStore.js"

import Login from "./components/Login"
import Body from "./components/Body"
import Feed from "./components/Feed"
import EditProfile from "./components/EditProfile.jsx"


function App() {


  return (
    <>
      <Provider store= {appStore}>
        <BrowserRouter basename= "/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/feed" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path= "/profile" element={<EditProfile />} />
              <Route path="/signup" element={<div>HELOOOO from SIGNUP</div>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
