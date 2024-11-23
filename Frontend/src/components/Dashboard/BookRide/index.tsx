import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaRegDotCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoIosAdd, IoMdSettings } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import HomeMap from "../Home/map";
import { Link } from "react-router-dom";
import { getSuggestions } from "./getSuggestions";

type Props = object;

const BookRide: React.FC<Props> = () => {
  const [source, setSource] = useState("");
  const [sourceSuggest, setSourceSuggest] = useState([]);

  useEffect(() => {}, [sourceSuggest]);

  const handleSouceChange = async (e: any) => {
    setSource(e.target.value);
    const suggestions = getSuggestions(source);
    suggestions.then((response) => {
      setSourceSuggest(response.data.suggestions);
    });
    console.log(sourceSuggest);
  };

  const handleDrag = () => {
    console.log("Hello World");
  };

  return (
    <div className="fixed bottom-0 flex flex-col gap-6 h-screen w-screen overflow-y-hidden justify-end">
      <div className="absolute z-50 top-20 px-6 flex justify-between items-center w-full font-normal text-lg">
        <Link to={"/dashboard/home"}>
          <IoMdArrowRoundBack />
        </Link>
        <div className="flex grow items-center font-semibold justify-center">
          Plan Your Ride
        </div>
      </div>
      <div className="w-full h-full">
        <HomeMap />
      </div>
      <div
        className="absolute py-3 z-50 h-4/5 max-h-[80%] mt-10 bg-white w-full flex px-5 flex-col rounded-xl justify-start items-center"
        draggable="true"
        onDrag={handleDrag}
      >
        <div className="w-1/6 border-2 rounded-full mb-4 mt-1"></div>
        <div className="flex w-full gap-2 justify-between items-center">
          <div className="w-1/2">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pickup Now" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>North America</SelectLabel>
                  <SelectItem value="est">
                    Eastern Standard Time (EST)
                  </SelectItem>
                  <SelectItem value="cst">
                    Central Standard Time (CST)
                  </SelectItem>
                  <SelectItem value="mst">
                    Mountain Standard Time (MST)
                  </SelectItem>
                  <SelectItem value="pst">
                    Pacific Standard Time (PST)
                  </SelectItem>
                  <SelectItem value="akst">
                    Alaska Standard Time (AKST)
                  </SelectItem>
                  <SelectItem value="hst">
                    Hawaii Standard Time (HST)
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-1/2">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="For Me" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>North America</SelectLabel>
                  <SelectItem value="est">
                    Eastern Standard Time (EST)
                  </SelectItem>
                  <SelectItem value="cst">
                    Central Standard Time (CST)
                  </SelectItem>
                  <SelectItem value="mst">
                    Mountain Standard Time (MST)
                  </SelectItem>
                  <SelectItem value="pst">
                    Pacific Standard Time (PST)
                  </SelectItem>
                  <SelectItem value="akst">
                    Alaska Standard Time (AKST)
                  </SelectItem>
                  <SelectItem value="hst">
                    Hawaii Standard Time (HST)
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center justify-center w-full mt-8 px-3 py-1 bg-[#F2F2F2] rounded-xl flex-col">
          <div className="text-sm w-full items-start">
            <Input
              Icon={<FaRegDotCircle />}
              onChange={(e) => {
                handleSouceChange(e);
              }}
              placeholder="Enter Pickup Point"
            />
            <div className="">
              {sourceSuggest.map((suggestion: any) => {
                return <h2>{suggestion.name}</h2>;
              })}
            </div>
          </div>
          <div className="w-full pl-8 flex items-center justify-between gap-1 overflow-hidden">
            <Separator orientation="vertical" className="bg-gray-300 ml-1" />
            <Separator className="bg-gray-300 w-auto flex-grow" />
            <div className="p-2 bg-green-200 rounded-xl flex items-center justify-center">
              <IoIosAdd className="flex items-center justify-center text-xl text-myGreen" />
            </div>
          </div>
          <div className="text-sm w-full">
            <Input Icon={<FaLocationDot />} placeholder="Enter Drop Point" />
          </div>
        </div>
        <div className="w-full mt-8">
          <Button className="bg-[#F2F2F2] gap-4 text-base w-full flex justify-start items-center px-4 text-black font-semibold rounded-xl py-4">
            <span className="p-2 rounded-full bg-green-100">
              <IoMdSettings className="text-myGreen" />
            </span>
            Saved Places
          </Button>
        </div>
        <div className="w-full mt-4">
          <div className="bg-[#F2F2F2] rounded-xl w-full">
            <Button className="bg-[#F2F2F2] gap-4 text-base w-full flex justify-start items-center px-4 text-black font-semibold rounded-xl py-4">
              <span className="p-2 rounded-full flex bg-green-100">
                <IoMdSettings className="text-myGreen" />
              </span>
              <div className="flex flex-col w-full items-start justify-start">
                <div className="">Home</div>
                <div className="line-clamp-1 text-start text-wrap font-normal text-xs text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque odit ullam voluptates quas est quibusdam pariatur
                  deleniti! Magnam rerum quod perspiciatis sint earum deleniti!
                  Accusantium voluptatum repudiandae tempora eveniet deserunt!
                </div>
              </div>
            </Button>
            <Button className="bg-[#F2F2F2] gap-4 text-base w-full flex justify-start items-center px-4 text-black font-semibold rounded-xl py-4">
              <span className="p-2 rounded-full flex bg-green-100">
                <IoMdSettings className="text-myGreen" />
              </span>
              <div className="flex flex-col w-full items-start justify-start">
                <div className="">Home</div>
                <div className="line-clamp-1 text-start text-wrap font-normal text-xs text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque odit ullam voluptates quas est quibusdam pariatur
                  deleniti! Magnam rerum quod perspiciatis sint earum deleniti!
                  Accusantium voluptatum repudiandae tempora eveniet deserunt!
                </div>
              </div>
            </Button>{" "}
            <Button className="bg-[#F2F2F2] gap-4 text-base w-full flex justify-start items-center px-4 text-black font-semibold rounded-xl py-4">
              <span className="p-2 rounded-full flex bg-green-100">
                <IoMdSettings className="text-myGreen" />
              </span>
              <div className="flex flex-col w-full items-start justify-start">
                <div className="">Home</div>
                <div className="line-clamp-1 text-start text-wrap font-normal text-xs text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque odit ullam voluptates quas est quibusdam pariatur
                  deleniti! Magnam rerum quod perspiciatis sint earum deleniti!
                  Accusantium voluptatum repudiandae tempora eveniet deserunt!
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRide;
