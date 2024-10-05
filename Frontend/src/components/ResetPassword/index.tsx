import React from "react";
import { Input } from "../ui/input";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button } from "../ui/button";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";

type Props = object;

const ResetPass: React.FC<Props> = () => {
  return (
    <div className="px-5 py-6 flex flex-col gap-10 h-screen w-screen">
      <Link to={"/signin"}>
        <div className="absolute top-14 left-7">
          <Button className="p-2 rounded-full bg-[#F2F2F2]">
            <MdKeyboardBackspace className="text-3xl " />
          </Button>
        </div>
      </Link>
      <div className="flex flex-col justify-center gap-4 items-center mt-24">
        <div className="text-4xl font-bold">Reset Your Password</div>
        <div className="line-clamp-2 px-4 text-xl text-[#A5A5A5] ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. In
          voluptatem, nemo, amet quod eligendi rerum quos quis aperiam optio
          velit saepe quia tenetur ipsum esse dolor exercitationem repellendus
          beatae distinctio?
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-4">
          <Input
            className="py-2 text-lg font-medium"
            Icon={<RiLockPasswordFill />}
            type="password"
            placeholder=""
          />
          <Input
            className="py-2 text-lg font-medium"
            Icon={<RiLockPasswordFill />}
            type="password"
            placeholder=""
          />
        </div>
        <div className="flex mt-8">
          <Button className="bg-[#46C96B] text-2xl w-full text-white font-semibold rounded-xl py-6 ">
            Reset Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;