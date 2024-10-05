import React from "react";
import { IoHomeSharp } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

type Props = object;

const Footer: React.FC<Props> = () => {
  return (
    <footer className="fixed bottom-0 bg-gray-200 w-full z-10 shadow-2xl p-4 py-6 rounded-t-2xl flex justify-between items-center">
      <div className="flex w-full justify-between px-6 items-center">
        <Link to="/dashboard/home">
          <div className="text-sm text-myGreen flex flex-col items-center justify-center gap-1">
            <IoHomeSharp className="text-[27px] text-myGreen text-[#46C96]" />
            Home
          </div>
        </Link>
        <Link to="/dashboard/home">
          <div className="text-sm flex flex-col items-center justify-center gap-1">
            <FaClipboardList className="text-[27px] text-gray-400 text-[#46C96]" />
            Booking
          </div>
        </Link>
        <Link to="/dashboard/home">
          <div className="text-sm flex flex-col items-center justify-center gap-1">
            <BiSolidMessageSquareDetail className="text-[27px] text-gray-400 text-[#46C96]" />
            Message
          </div>
        </Link>
        <Link to="/dashboard/profile">
          <div className="text-sm flex flex-col items-center justify-center gap-1">
            <FaUser className="text-[27px] text-gray-400 text-[#46C96]" />
            Profile
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
