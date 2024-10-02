import React, { useEffect, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { Button } from "../ui/button";
import { RolePopup } from "../Popups/otpPopup";

type Props = object;

const OtpVerification: React.FC<Props> = () => {
  const [time, setTime] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(false);
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-full pt-8 p-4 flex flex-col justify-between">
      <div className="w-full gap-6 flex flex-col">
        <div className="text-xl font-semibold ">
          Enter the OTP sent to your phone number
        </div>
        <div className="flex justify-center items-center">
          <InputOTP maxLength={6}>
            <InputOTPGroup className="rounded-xl gap-2 ">
              <InputOTPSlot
                className="border-none bg-gray-200 rounded-xl"
                index={0}
              />
              <InputOTPSlot
                className="border-none bg-gray-200 rounded-xl"
                index={1}
              />
              <InputOTPSlot
                className="border-none bg-gray-200 rounded-xl"
                index={2}
              />
              <InputOTPSlot
                className="border-none bg-gray-200 rounded-xl"
                index={3}
              />
              <InputOTPSlot
                className="border-none bg-gray-200 rounded-xl"
                index={4}
              />
              <InputOTPSlot
                className="border-none bg-gray-200 rounded-xl"
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>
        </div>
        {time ? (
          <Button
            className="flex w-fit p-2 rounded-xl text-gray-600 font-semibold px-4 bg-gray-200"
            disabled={true}
            onClick={() => setTime(false)}
          >
            I havent Recieved the Code {time}
          </Button>
        ) : (
          <RolePopup />
        )}

        <div className="w-full flex justify-between">
          <Button className="flex w-fit p-2 rounded-full text-4xl font-semibold bg-gray-200">
            <IoIosArrowRoundBack />
          </Button>
          <Button className="flex w-fit p-2 px-6 rounded-full gap-2 justify-between items-center bg-gray-200">
            Next <IoIosArrowRoundForward className="text-4xl font-semibold" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
