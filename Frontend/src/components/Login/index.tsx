import React from "react";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Props = object;

const Login: React.FC<Props> = () => {

  return (
    <div className="h-screen w-full pt-8 p-4 flex flex-col justify-between">
      <div className="">
        <div className="flex flex-col gap-4 items-start justify-center">
          <div className="font-medium text-xl ">
            What's your phone no. or Email ?
          </div>
          <div className="w-full flex gap-2 items-center justify-center">
            <div className="w-1/4 p-3 rounded-xl bg-gray-200 flex items-center justify-center">
              .
            </div>
            <div className="w-3/4 p-2 rounded-xl bg-gray-200 flex items-center justify-center">
              <Input className="border-none text-lg"></Input>
            </div>
          </div>
          <div className="w-full">
            <Button className="w-full p-4 rounded-xl bg-black text-white font-medium flex items-center justify-center text-lg">
              Continue
            </Button>
          </div>
        </div>
        <div className="my-4 flex items-center justify-center">
          <div className="h-0 w-full border flex items-center justify-center border-gray-400"></div>
          <span className="px-3">or</span>
          <div className="h-0 w-full border flex items-center justify-center border-gray-400"></div>
        </div>
        <div className="w-full h-auto flex flex-col gap-2">
          <div className="w-full rounded-xl bg-gray-200 flex items-center justify-center">
            <Button className="w-full gap-3 p-4 text-lg flex items-center justify-center">
              <FcGoogle className="text-xl" /> Continue with Google
            </Button>
          </div>
          <div className="w-full rounded-xl bg-gray-200 flex items-center justify-center">
            <Button className="w-full gap-3 p-4 text-lg flex items-center justify-center">
              <FaApple className="text-xl" /> Continue with Apple
            </Button>
          </div>
          <div className="w-full rounded-xl bg-gray-200 flex items-center justify-center">
            <Button className="w-full gap-3 p-4 text-lg flex items-center justify-center">
              <FaFacebook className="text-xl text-blue-500" /> Continue with
              Facebook
            </Button>
          </div>
          <div className="text-sm line-clamp-3 my-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod
            cumque esse corrupti. Atque, quam voluptatum? Ex fuga placeat quidem
            nihil eos aperiam debitis omnis iure, tempora unde quia soluta
            officiis.
          </div>
        </div>
      </div>
      <div className="line-clamp-2 text-sm">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos doloribus
        exercitationem facere cum, velit, nostrum fuga harum omnis modi alias
      </div>
    </div>
  );
};

export default Login;
