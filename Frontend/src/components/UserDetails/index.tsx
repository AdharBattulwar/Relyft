import React from "react";
import { Input } from "../ui/input";

type Props = object;

const UserDetails: React.FC<Props> = () => {
  return (
    <div className="h-screen w-full pt-8 p-4 flex flex-col">
      <div className="text-xl font-semibold">User Details</div>
      <div className="w-full">
        <div className="w-full flex flex-col gap-4 items-start justify-center">
          <div className="w-full flex flex-col gap-2 ">
            <span className="text-xl font-semibold ">Username</span>
            <Input className="border-none rounded-xl flex items-center justify-center bg-gray-200 p-3 w-full"></Input>
          </div>
          <div className="w-full">
            <span>Email</span>
            <Input className="border-none bg-gray-200 p-3 w-full"></Input>
          </div>
          <div className="w-full">
            <span>Password</span>
            <Input className="border-none bg-gray-200 p-3 w-full"></Input>
          </div>
          <div className="w-full">
            <span>Confirm Password</span>
            <Input className="border-none bg-gray-200 p-3 w-full"></Input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
