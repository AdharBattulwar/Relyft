import { Route, Routes } from "react-router-dom";
import OtpVerification from "./components/OtpVerification";
import Signup from "./components/SignUp";
import Signin from "./components/SignIn";
import ForgotPassword from "./components/ForgotPass";
import ResetPass from "./components/ResetPassword";
import Home from "./components/Dashboard/Home";
import Profile from "./components/Dashboard/Profile";
import BookRide from "./components/Dashboard/BookRide";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/otp" element={<OtpVerification />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPass />} />
        <Route path="/dashboard/home" element={<Home />} />
        <Route path="/dashboard/Profile" element={<Profile />} />
        <Route path="/dashboard/BookRide" element={<BookRide />} />
      </Routes>
    </>
  );
}

export default App;
