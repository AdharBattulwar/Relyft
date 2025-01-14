import React, { useContext, useEffect, useState } from "react";

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
// import HomeMap from "../Home/map";
import { Link, useNavigate } from "react-router-dom";
import { getSuggestions } from "./getSuggestions";
import getCoordinates from "./getCoordinates";
import { getDistAndPath } from "../DistAndPath/getDistAndPath";
import {
  destinationCoordContext,
  sourceCoordContext,
} from "@/ContextApi/routeCoordContext";
import { getRouteContext } from "@/ContextApi/SrcDstRouteContext";
// import MapboxExample from "../Home/mapbox";

type Props = object;

const BookRide: React.FC<Props> = () => {
  const [source, setSource] = useState("");
  const [finalSource, setFinalSource] = useState<{
    name: string;
    mapbox_id: string;
  } | null>(null);
  const [finalDestination, setFinalDestination] = useState<{
    name: string;
    mapbox_id: string;
  } | null>(null);
  const [sourceSuggest, setSourceSuggest] = useState([]);
  const [destination, setDestination] = useState("");
  const [destinationSuggest, setDestinationSuggest] = useState([]);
  const { setSourceCoordinates } = useContext(sourceCoordContext);
  const { setDestinationCoordinates } = useContext(destinationCoordContext);

  const { setSrcDstRoute } = useContext(getRouteContext);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (source && finalSource === null) {
        getSuggestions(source).then((response) => {
          setSourceSuggest(response.data.suggestions);
        });
      }
      if (destination && finalDestination === null) {
        getSuggestions(destination).then((response) => {
          setDestinationSuggest(response.data.suggestions);
        });
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [source, destination, finalSource, finalDestination]);

  const navigate = useNavigate();

  const getLatAndLng = async () => {
    let localSourceCoords = null;
    let localDestinationCoords = null;
    if (finalSource && finalDestination) {
      localSourceCoords = await getCoordinates(finalSource.mapbox_id);
      localDestinationCoords = await getCoordinates(finalDestination.mapbox_id);

      if (localSourceCoords && localDestinationCoords) {
        setSourceCoordinates({
          lng: localSourceCoords[0],
          lat: localSourceCoords[1],
        });
        setDestinationCoordinates({
          lng: localDestinationCoords[0],
          lat: localDestinationCoords[1],
        });
      }

      const SourceLngLat = {
        lng: localSourceCoords[0],
        lat: localSourceCoords[1],
      };

      const DestinationLngLat = {
        lng: localDestinationCoords[0],
        lat: localDestinationCoords[1],
      };

      if (SourceLngLat.lng != null && DestinationLngLat.lng != null) {
        getDistAndPath(
          SourceLngLat,
          DestinationLngLat,
          "driving"
          //TODO: add the mode of transport here by user's choice
        ).then((response) => {
          console.log(response);
          setSrcDstRoute(response);
          navigate("/dashboard/home");
        });
        // TODO: Solve this error after clicking bookride
      }
    }
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
        {/* <HomeMap /> */}
        {/* <MapboxExample /> */}
      </div>
      <div className="absolute py-3 z-50 h-4/5 max-h-[80%] mt-10 bg-white w-full flex px-5 flex-col rounded-xl justify-start overflow-y-auto items-center">
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
              onInput={(e) => {
                setSource((e.target as HTMLInputElement).value);
                setFinalSource(null);
              }}
              value={source}
              placeholder="Enter Pickup Point"
            />
          </div>
          <div className="w-full pl-8 flex items-center justify-between gap-1 overflow-hidden">
            <Separator orientation="vertical" className="bg-gray-300 ml-1" />
            <Separator className="bg-gray-300 w-auto flex-grow" />
            <div className="p-2 bg-green-200 rounded-xl flex items-center justify-center">
              <IoIosAdd className="flex items-center justify-center text-xl text-myGreen" />
            </div>
          </div>
          <div className="text-sm w-full">
            <Input
              Icon={<FaLocationDot />}
              onInput={(e) => {
                setDestination((e.target as HTMLInputElement).value);
                setFinalDestination(null);
              }}
              value={destination}
              placeholder="Enter Drop Point"
            />
          </div>
        </div>
        <div className="w-full mt-8">
          <div className="p-3 rounded-xl">
            {sourceSuggest.length > 0 && finalSource?.name !== source && (
              <div>
                {sourceSuggest.map(
                  (suggestion: {
                    mapbox_id: string;
                    name: string;
                    full_address: string;
                  }) => (
                    <div
                      key={suggestion.mapbox_id}
                      className="line-clamp-1 px-3 py-1 flex flex-col gap-1 justify-start items-start mb-1 hover:bg-gray-100 cursor-pointer rounded-xl"
                      onClick={() => {
                        setFinalSource(suggestion);
                        setSource(suggestion.name);
                        setSourceSuggest([]);
                      }}
                    >
                      <div className=""> {suggestion.name} </div>
                      <div className="">{suggestion.full_address}</div>
                    </div>
                  )
                )}
              </div>
            )}
            {destinationSuggest.length > 0 &&
              finalDestination?.name !== destination && (
                <div>
                  {destinationSuggest.map(
                    (suggestion: {
                      mapbox_id: string;
                      name: string;
                      full_address: string;
                    }) => (
                      <div
                        key={suggestion.mapbox_id}
                        className="line-clamp-1 px-3 py-1 flex flex-col gap-1 justify-start items-start mb-1 hover:bg-gray-100 cursor-pointer rounded-xl"
                        onClick={() => {
                          setFinalDestination(suggestion);
                          setDestination(suggestion.name);
                          setDestinationSuggest([]);
                        }}
                      >
                        <div className=""> {suggestion.name} </div>
                        <div className="">{suggestion.full_address}</div>
                      </div>
                    )
                  )}
                </div>
              )}
          </div>
        </div>
        <div className="">
          <Button
            onClick={getLatAndLng}
            className="bg-[#F2F2F2] gap-4 text-base w-full flex justify-start items-center px-4 text-black font-semibold rounded-xl py-4"
          >
            Book Ride
          </Button>
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
