import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import OtpVerification from "./components/OtpVerification";
import UserDetails from "./components/UserDetails";
import Signup from "./components/SignUp";
import Signin from "./components/SignIn";
import ForgotPassword from "./components/ForgotPass";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OtpVerification />} />
        <Route path="/userDetails" element={<UserDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgot" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
