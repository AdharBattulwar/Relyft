import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { HiOutlineMail } from "react-icons/hi";
import { Input } from "../ui/input";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebaseConfig"; // Import Firebase auth instance

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Verification email sent! Please check your inbox.");
      setEmail(""); // Clear email input
    } catch (error) {
      console.error("Error during password reset:", error);
      setError("Error: " + error.message);
    }
  };

  return (
    <div className="px-5 py-6 flex flex-col gap-10 h-screen w-screen">
      <Link to={"/"}>
        <div className="absolute top-7 left-7">
          <Button className="p-2 rounded-full bg-[#F2F2F2]">
            <MdKeyboardBackspace className="text-xl" />
          </Button>
        </div>
      </Link>
      <div className="flex flex-col justify-center gap-4 items-center">
        <div className="text-xl font-bold">Forgot Password</div>
        <div className="line-clamp-2 px-4 text-sm text-[#A5A5A5] ">
          Please enter your email address to receive a password reset link.
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <form onSubmit={onSignInSubmit}>
          <div className="flex flex-col gap-4">
            <Input
              className="py-2 text-base font-medium"
              Icon={<HiOutlineMail />}
              name="email"
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Handle email input change
            />
          </div>
          <div className="flex mt-4">
            <Button
              type="submit"
              className="bg-[#46C96B] mx-3 text-base w-full text-white font-semibold rounded-xl py-4"
            >
              Send Code
            </Button>
          </div>
        </form>
        {message && <div className="text-green-500">{message}</div>} {/* Success message */}
        {error && <div className="text-red-500">{error}</div>} {/* Error message */}
      </div>
    </div>
  );
};

export default ForgotPassword;
