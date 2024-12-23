import { Route, Routes } from "react-router-dom";
import OtpVerification from "./components/OtpVerification";
import Signup from "./components/SignUp";
import Signin from "./components/SignIn";
import ForgotPassword from "./components/ForgotPass";
import ResetPass from "./components/ResetPassword";
import Home from "./components/Dashboard/Home";
import Profile from "./components/Dashboard/Profile";
import BookRide from "./components/Dashboard/BookRide";
import { UserLocationContext } from "./ContextApi/userLocationContext";
import {
  sourceCoordContext,
  destinationCoordContext,
} from "./ContextApi/routeCoordContext";
import { getRouteContext } from "./ContextApi/SrcDstRouteContext";
import { useState } from "react";

function App() {
  const [sourceCoordinates, setSourceCoordinates] = useState<null | {
    lat: number;
    lng: number;
  }>(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState<null | {
    lat: number;
    lng: number;
  }>(null);

  const [userLocation, setUserLocation] = useState<null | {
    lat: number;
    lng: number;
  }>(null);

  const [srcDstRoute, setSrcDstRoute] = useState<null | object>(null);

  return (
    <>
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <sourceCoordContext.Provider
          value={{ sourceCoordinates, setSourceCoordinates }}
        >
          <destinationCoordContext.Provider
            value={{ destinationCoordinates, setDestinationCoordinates }}
          >
            <getRouteContext.Provider value={{ srcDstRoute, setSrcDstRoute }}>
              <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/otp" element={<OtpVerification />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/forgot" element={<ForgotPassword />} />
                <Route path="/reset" element={<ResetPass />} />
                {/* <userLogin */}
                <Route path="/dashboard/home" element={<Home />} />
                <Route path="/dashboard/Profile" element={<Profile />} />
                <Route path="/dashboard/BookRide" element={<BookRide />} />
              </Routes>
            </getRouteContext.Provider>
          </destinationCoordContext.Provider>
        </sourceCoordContext.Provider>
      </UserLocationContext.Provider>
    </>
  );
}

export default App;
