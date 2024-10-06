import React from "react";
import Footer from "../Footer";
import Location from "./location";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoLocationSharp } from "react-icons/io5";
import { HiHome } from "react-icons/hi2";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { FaCartShopping } from "react-icons/fa6";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "@/components/utils/constants";

type Props = object;

const Home: React.FC<Props> = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Logout Clicked");
    await axios
      .get(`${SERVER_URL}/api/v1/user/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("success");
        console.log(res);
        if (res.data.success === true) navigate("/");
        else console.log("error");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="fixed bottom-0 pt-20 pb-28 flex flex-col gap-6 h-screen w-screen overflow-y-scroll justify-end">
        <div className="absolute top-20 left-4">
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src="https://res.cloudinary.com/dz9tzcoyr/image/upload/v1727515449/agnlcpo3zpr3zyxrj4so.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col items-center justify-center gap-2">
                <Button className="flex items-center justify-center text-sm bg-green-100 w-full rounded-xl py-2">
                  Profile
                </Button>
                <Button className="flex items-center justify-center text-sm bg-green-100 w-full rounded-xl py-2">
                  Settings
                </Button>
                <Button
                  className="flex items-center justify-center text-sm bg-green-100 w-full rounded-xl py-2"
                  onClick={() => handleLogout()}
                >
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex px-5 flex-col rounded-xl justify-between items-center">
          <div className="w-1/6 border-2 rounded-full my-4"></div>
          <div className="w-full flex justify-between items-center">
            <div className="font-semibold text-base">Where To?</div>
            <div className="text-myGreen">Customize</div>
          </div>
          <div className="w-full flex items-center mt-2 pb-3 gap-4 justify-start overflow-y-scroll">
            <Location
              icon={<IoLocationSharp className="text-[27px]" />}
              bookmark="Destination"
              address="Home"
            />
            <Location
              icon={<HiHome className="text-[27px]" />}
              bookmark="Home"
              address="N-308, Three Jewels Societ, Near Hubtown Road, Tilekar Nagar, Kondhwa Bhudruk, Pune, 411048"
            />
            <Location
              icon={<HiBuildingOffice2 className="text-[27px]" />}
              bookmark="Office"
              address="Google Office, Baner,  Pune"
            />
            <Location
              icon={<HiHome className="text-[27px]" />}
              bookmark="Jhon's Home"
              address="Prima Domus, Balewadi, Pune"
            />
            <Location
              icon={<FaCartShopping className="text-[27px]" />}
              bookmark="Salon"
              address="5th Street, Cubbon Road, Banglore"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
