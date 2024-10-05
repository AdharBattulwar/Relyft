import React from "react";
import { Input } from "../ui/input";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import axios from "axios";

type Props = object;

const Signin: React.FC<Props> = () => {
  const handleSignin = async (e: any) => {
    e.preventDefault();
    const userdata = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    console.log(userdata);

    await axios.post("http://localhost:8000/api/v1/user/signin", userdata).then((res) => {
      console.log("success");
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }
  return (
    <div className="px-5 py-6 flex flex-col gap-10 h-screen w-screen">
        <div className="absolute top-14 left-7" >
            <Button className="p-2 rounded-full bg-[#F2F2F2]">
                <MdKeyboardBackspace className="text-3xl "/>
            </Button>
        </div>
      <div className="flex flex-col justify-center gap-4 items-center mt-24">
        <div className="text-4xl font-bold">Sign In</div>
        <div className="line-clamp-2 px-4 text-xl text-[#A5A5A5] ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. In
          voluptatem, nemo, amet quod eligendi rerum quos quis aperiam optio
          velit saepe quia tenetur ipsum esse dolor exercitationem repellendus
          beatae distinctio?
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <form onSubmit={handleSignin}>
        <div className="flex flex-col gap-4">
          <Input
            className="py-2 text-lg font-medium"
            Icon={<HiOutlineMail />}
            type="email"
            name="email"
            placeholder=""
          />
          <Input
            className="py-2 text-lg font-medium"
            Icon={<RiLockPasswordFill />}
            type="password"
            name="password"
            placeholder=""
          />
        </div>
        <Link to={"/forgot"}>
          <div className="flex items-center text-xl mt-2 underline text-myGreen font-medium justify-end">
            Forgot Password
          </div>
        </Link>
        <div className="flex mt-4">
          <Button className="bg-[#46C96B] text-2xl w-full text-white font-semibold rounded-xl py-6 ">
            Sign In
          </Button>
        </div>
        </form> 
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="text-[#A5A5A5] text-xl">Or Sign In With</div>
        <div className="flex gap-4 items-center justify-center">
          <Button className="p-4 bg-[#f2f2f2] rounded-xl ">
            <FcGoogle className="text-4xl" />
          </Button>
          <Button className="p-4 bg-[#f2f2f2] rounded-xl ">
            <FaApple className="text-4xl text-gray-600" />
          </Button>
          <Button className="p-4 bg-[#f2f2f2] rounded-xl ">
            <FaFacebook className="text-4xl text-blue-500" />
          </Button>
        </div>
      </div>
      <div className=" h-full items-end flex text-xl font-medium gap-1 justify-center">
        Don't Have an Account ?
        <Link to={"/"} className="text-[#46C96B]">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Signin;
