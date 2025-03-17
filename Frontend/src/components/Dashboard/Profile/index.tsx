import Footer from "../Footer";
import { Button } from "@/components/ui/button";
import { MdKeyboardBackspace } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { FaUser } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { FaCcMastercard } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoMdHelpCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import AuthContext from "@/ContextApi/AuthContext";
import { useContext } from "react";

const Profile = () => {

  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="fixed bottom-0 pt-20 px-5 pb-28 flex flex-col gap-6 h-screen w-screen overflow-y-scroll justify-start">
        <Link to={"/dashboard/home"}>
          <div className="absolute top-20 left-7">
            <Button className="p-2 rounded-full bg-[#F2F2F2]">
              <MdKeyboardBackspace className="text-xl " />
            </Button>
          </div>
        </Link>
        <div className="flex flex-col justify-center items-center">
          <div className="text-lg font-semibold">Profile</div>
          <div className="my-8 flex flex-col gap-4 justify-center items-center">
            <div className="flex size-32 items-center justify-center bg-myGreen rounded-full overflow-hidden">
              <Avatar>
                <AvatarImage src={user?.avatar || ""} className=" rounded-full scale-125"/>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center justify-center">
              <span className="font-semibold text-xl">Adhar Battulwar</span>
            </div>
          </div>
          <div className="flex flex-col justify-center w-full items-center gap-4">
            <div className="w-full">
              <Button className="bg-[#F2F2F2] text-base gap-4 w-full flex justify-start items-center px-4 text-black font-semibold rounded-xl py-4">
                <span className="p-2 rounded-full bg-green-100">
                  <FaUser className="text-myGreen" />
                </span>
                My Profile
              </Button>
            </div>
            <div className="w-full">
              <Button className="bg-[#F2F2F2] gap-4 text-base w-full flex justify-start items-center px-4 text-black font-semibold rounded-xl py-4">
                <span className="p-2 rounded-full bg-green-100">
                  <IoLocationSharp className="text-myGreen" />
                </span>
                Manage Address
              </Button>
            </div>
            <div className="w-full">
              <Button className="bg-[#F2F2F2] gap-4 text-base w-full flex justify-start items-center px-4 text-black font-semibold rounded-xl py-4">
                <span className="p-2 rounded-full bg-green-100">
                  <IoNotifications className="text-myGreen" />
                </span>
                Notification
              </Button>
            </div>
            <div className="w-full">
              <Button className="bg-[#F2F2F2] gap-4 text-base w-full flex justify-start items-center px-4 text-black font-semibold rounded-xl py-4">
                <span className="p-2 rounded-full bg-green-100">
                  <FaCcMastercard className="text-myGreen" />
                </span>
                Payments Methods
              </Button>
            </div>
            <div className="w-full">
              <Button className="bg-[#F2F2F2] gap-4 text-base w-full flex justify-start items-center px-4 text-black font-semibold rounded-xl py-4">
                <span className="p-2 rounded-full bg-green-100">
                  <IoMdSettings className="text-myGreen" />
                </span>
                Setting
              </Button>
            </div>
            <div className="w-full">
              <Button className="bg-[#F2F2F2] gap-4 text-base w-full flex justify-start items-center px-4 text-black font-semibold rounded-xl py-4">
                <span className="p-2 rounded-full bg-green-100">
                  <IoMdHelpCircle className="text-myGreen" />
                </span>
                Help Center
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
