import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Checkbox } from "../ui/checkbox";

type Props = object;

const Signup: React.FC<Props> = () => {
  return (
    <div className="px-5 py-6 flex flex-col gap-10 h-screen w-screen">
      <div className="flex flex-col justify-center gap-4 items-center mt-24">
        <div className="text-4xl font-bold">Sign Up</div>
        <div className="line-clamp-2 px-4 text-xl text-[#A5A5A5] ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. In
          voluptatem, nemo, amet quod eligendi rerum quos quis aperiam optio
          velit saepe quia tenetur ipsum esse dolor exercitationem repellendus
          beatae distinctio?
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-4">
          <Input className="py-2 text-lg font-medium" Icon={<BsPersonCircle/>} type="text" placeholder=""/>
          <Input className="py-2 text-lg font-medium" Icon={<HiOutlineMail/>} type="email" placeholder=""/>
          <Input className="py-2 text-lg font-medium" Icon={<RiLockPasswordFill/>} type="password" placeholder=""/>
        </div>
        <div className="flex items-center text-xl mt-2 gap-4"><Checkbox className="border-myGreen border-2 rounded-[5px]"/> Agree Terms & Conditions</div>
        <div className="flex mt-4">
          <Button className="bg-[#46C96B] text-2xl w-full text-white font-semibold rounded-xl py-6 ">
            Sign Up
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="text-[#A5A5A5] text-xl">Or Sign Up With</div>
        <div className="flex gap-4 items-center justify-center">
          <Button className="p-4 bg-[#f2f2f2] rounded-xl ">
            <FcGoogle className="text-4xl"/>
          </Button>
          <Button className="p-4 bg-[#f2f2f2] rounded-xl ">
            <FaApple className="text-4xl text-gray-600"/>
          </Button>
          <Button className="p-4 bg-[#f2f2f2] rounded-xl ">
            <FaFacebook className="text-4xl text-blue-500"/>
          </Button>
        </div>
      </div>
      <div className="flex text-xl font-medium gap-1 justify-center">
        Already Have an Account ?<Link to={"/"} className="text-[#46C96B]">Sign In</Link>
      </div>
    </div>
  );
};

export default Signup;
