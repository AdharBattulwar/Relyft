import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../ui/input-otp";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

type Props = object;

const OtpVerification: React.FC<Props> = () => {
  return (
    <div className="h-screen w-full pt-8 p-4 flex flex-col justify-between">
      <div className="w-full gap-6 flex flex-col">
        <div className="text-xl font-semibold ">Enter the OTP sent to your phone number</div>
        <div className="flex justify-center items-center">
          <InputOTP maxLength={6}>
            <InputOTPGroup className="rounded-xl gap-2 ">
              <InputOTPSlot className="border-none bg-gray-200 rounded-xl" index={0} />
              <InputOTPSlot className="border-none bg-gray-200 rounded-xl" index={1} />
              <InputOTPSlot className="border-none bg-gray-200 rounded-xl" index={2} />
              <InputOTPSlot className="border-none bg-gray-200 rounded-xl" index={3} />
              <InputOTPSlot className="border-none bg-gray-200 rounded-xl" index={4} />
              <InputOTPSlot className="border-none bg-gray-200 rounded-xl" index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="flex w-fit p-2 rounded-xl text-gray-500 font-semibold px-4 bg-gray-200">I havent Recieved the Code</div>
        <div className="w-full flex justify-between">
          <div className="flex w-fit p-2 rounded-full text-4xl font-semibold bg-gray-200"><IoIosArrowRoundBack/></div>
          <div className="flex w-fit p-2 px-6 rounded-full gap-2 justify-between items-center bg-gray-200">Next <IoIosArrowRoundForward className="text-4xl font-semibold"/></div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
