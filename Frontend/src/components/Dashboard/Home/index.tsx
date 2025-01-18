import React, { useEffect, useState } from "react";
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
// import { APIProvider, Map } from "@vis.gl/react-google-maps";
// import HomeMap from "./map";
// import MapboxExample from "./mapbox";
import ReactMap from "./reactMap";

type Props = object;

const Home: React.FC<Props> = () => {
  const navigate = useNavigate();

  interface UserInfo {
    avatar?: string;
    username?: string | null;
    // Add other properties if needed
  }

  const [userInfo, setUserInfo] = useState<UserInfo>({});

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

  useEffect(() => {
    // const token = localStorage.getItem('token')

    axios
      .get(`${SERVER_URL}/api/v1/user/getUser`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success == false) {
          navigate("/signin");
        }
        console.log(res);
        if (res.data.user) {
          setUserInfo(res.data.user);
          console.log(res.data.user.avatar);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.success == false) {
          navigate("/signin");
        }
      });
  }, []);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <>
      <div className="fixed bottom-0 pb-28 flex flex-col gap-6 h-screen w-screen overflow-y-scroll justify-end">
        <div className="absolute z-50 top-20 left-4">
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src={userInfo.avatar || ""} />
                <AvatarFallback>
                  <img src="https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144855718.jpg"></img>
                </AvatarFallback>
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
        <div className="w-full h-full overflow-hidden">
          {/* <MapboxExample /> Replace with HomeMap for Google Maps */}
          <ReactMap username={userInfo.username || ""} />
        </div>
        <div className="flex px-5 flex-col rounded-xl justify-between items-center">
          <div className="w-1/6 border-2 rounded-full mb-4 mt-1"></div>
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
