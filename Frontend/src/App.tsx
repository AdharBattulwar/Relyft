import { Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import OtpVerification from "./components/OtpVerification"
import UserDetails from "./components/UserDetails"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/otp" element={<OtpVerification/>} />
      <Route path="/userDetails" element={<UserDetails/>} />
    </Routes>
    </>
  )
}

export default App
