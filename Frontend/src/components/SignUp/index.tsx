import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Checkbox } from "../ui/checkbox";
import { MdKeyboardBackspace } from "react-icons/md";
import { SERVER_URL } from "../utils/constants";
import googleAuth from "../AuthProviders/google";
import facebookAuth from "../AuthProviders/facebook";
import githubAuth from "../AuthProviders/github";

type Props = object;

const Signup: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log(user);
  },[user]);


  const handleSignup = async (e: any) => {
    e.preventDefault();
    const userdata = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    console.log(userdata);
    console.log(user);

    await axios
      .post(`${SERVER_URL}/api/v1/user/signup`, userdata, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("success");
        console.log(res);
        // TODO : Set Link And add Cookie to the browser for SignUp
        if (res.data.success === true) {
          navigate("/signin");
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="px-5 py-6 flex flex-col gap-10 h-screen w-screen">
      {/* TODO : Set Link */}
      <Link to={"/"}>
        <div className="absolute top-7 left-7">
          <Button className="p-2 rounded-full bg-[#F2F2F2]">
            <MdKeyboardBackspace className="text-xl " />
          </Button>
        </div>
      </Link>
      <div className="flex flex-col justify-center gap-4 items-center mt-8">
        <div className="text-2xl font-bold ">Sign Up</div>
        <div className="line-clamp-2 px-4 text-sm text-[#A5A5A5] ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. In
          voluptatem, nemo, amet quod eligendi rerum quos quis aperiam optio
          velit saepe quia tenetur ipsum esse dolor exercitationem repellendus
          beatae distinctio?
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <form onSubmit={handleSignup}>
          <div className="flex flex-col gap-4">
            <Input
              name="username"
              className="text-base font-medium"
              Icon={<BsPersonCircle />}
              type="text"
              required
              placeholder="Enter your Username"
            />
            <Input
              name="email"
              className="text-base font-medium"
              Icon={<HiOutlineMail />}
              type="email"
              required
              placeholder="Enter your Email"
            />
            <Input
              name="password"
              className="text-base font-medium"
              Icon={<RiLockPasswordFill />}
              type="password"
              required
              placeholder="Enter your Password"
            />
          </div>
          <div className="flex items-center text-sm mt-6 gap-4">
            <Checkbox
              className="border-myGreen border-2 rounded-[5px]"
              required
            />{" "}
            Agree Terms & Conditions
          </div>
          <div className="flex mt-6">
            <Button className="bg-[#46C96B] text-base mx-3 w-full text-white font-semibold rounded-xl py-4 ">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="text-[#A5A5A5] text-base">Or Sign Up With</div>
        <div className="flex gap-4 items-center justify-center">
          <Button onClick={()=>setUser(googleAuth)} className="p-4 bg-[#f2f2f2] rounded-xl ">
            <FcGoogle className="text-2xl" />
          </Button>
          <Button onClick={githubAuth} className="p-4 bg-[#f2f2f2] rounded-xl ">
            <FaGithub className="text-2xl text-gray-600" />
          </Button>
          <Button onClick={facebookAuth} className="p-4 bg-[#f2f2f2] rounded-xl ">
            <FaFacebook className="text-2xl text-blue-500" />
          </Button>
        </div>
      </div>
      <div className="flex flex-grow mb-12 text-sm font-medium gap-1 justify-center">
        Already Have an Account ?
        <Link to={"/signin"} className="text-[#46C96B]">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Signup;
