import { Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import OtpVerification from "./components/OtpVerification"
import UserDetails from "./components/UserDetails"
import Signup from "./components/SignUp"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/otp" element={<OtpVerification/>} />
      <Route path="/userDetails" element={<UserDetails/>} />
      <Route path="/signup" element={<Signup/>} />
    </Routes>
    </>
  )
}

export default App
