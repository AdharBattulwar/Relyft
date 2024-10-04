import React, { useEffect, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Button } from "../ui/button";
import { RolePopup } from "../Popups/otpPopup";
import { Link } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

type Props = object;

const OtpVerification: React.FC<Props> = () => {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(timer); // Clean up the interval on component unmount
    }
  }, [seconds]);

  return (
    <div className="px-5 py-6 flex flex-col gap-10 h-screen w-screen">
      {/* TODO: Setlink */}
      <Link to={"/forgot"}>
        <div className="absolute top-14 left-7">
          <Button className="p-2 rounded-full bg-[#F2F2F2]">
            <MdKeyboardBackspace className="text-3xl " />
          </Button>
        </div>
      </Link>
      <div className="flex flex-col justify-center gap-4 items-center mt-24">
        <div className="text-4xl font-bold">Enter Your OTP</div>
        <div className="line-clamp-2 px-4 text-xl text-[#A5A5A5] ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. In
          voluptatem, nemo, amet quod eligendi rerum quos quis aperiam optio
          velit saepe quia tenetur ipsum esse dolor exercitationem repellendus
          beatae distinctio?
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-center flex-col gap-4">
          <InputOTP maxLength={4}>
            <InputOTPGroup className="rounded-xl gap-4 ">
              <InputOTPSlot
                className="size-16 border-none bg-gray-200 rounded-xl"
                index={0}
              />
              <InputOTPSlot
                className="size-16 border-none bg-gray-200 rounded-xl"
                index={1}
              />
              <InputOTPSlot
                className="size-16 border-none bg-gray-200 rounded-xl"
                index={2}
              />
              <InputOTPSlot
                className="size-16 border-none bg-gray-200 rounded-xl"
                index={3}
              />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="flex items-center justify-center mt-6">
          {seconds ? (
            <Button
              className="flex items-center justify-center w-fit p-2 font-semibold px-4"
              disabled={true}
            >
              Resend the Code in <div className="text-myGreen">&nbsp; {seconds} &nbsp;</div> sec
            </Button>
          ) : (
            <Button
              className="flex w-fit items-center justify-center p-2 font-semibold px-4 "
              disabled={false}
            >
              <RolePopup/>
            </Button>
          )}
        </div>
        <div className="flex mt-4">
          <Button className="bg-[#46C96B] text-2xl w-full text-white font-semibold rounded-xl py-6 ">
            Verify Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
