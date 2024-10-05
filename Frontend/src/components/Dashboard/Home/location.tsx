import React from "react";
type Props = {
  icon: React.ReactNode;
  bookmark: string;
  address: string;
};

const Location: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col bg-[#F2F2F2] pt-0 mt-9 p-4 pb-7 rounded-xl justify-center items-center">
      <div className="relative -top-8 p-3 rounded-xl bg-green-100 text-myGreen">
        {props.icon}
      </div>
      <div className="w-24 flex justify-center flex-wrap text-nowrap items-center font-semibold ">
        {props.bookmark}
      </div>
      {/* TODO: Add Hover State to view the whole address */}
      <div className="w-full text-xs text-[#A5A5A5] flex items-center justify-center">
        <span className="line-clamp-1">{props.address}</span>
      </div>
    </div>
  );
};

export default Location;
