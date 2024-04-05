"use client";
import { cards } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import MeetingModal from "./MeetingModal";

const MeetingTypeList = () => {
  const [meetingType, setMeetingType] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const createMeeting =()=>{
    
  }
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((item: any) => {
        return (
          <div
            key={item.title}
            onClick={() => setMeetingType(item.meetingType)}
            className={cn(
              item.bgColor,
              " px-4 py-6 flex flex-col justify-between w-full xl:mx-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer"
            )}
          >
            <div className="flex-center glassmorphism size-12 rounded-[10px]">
              <Image
                src={item.imgUrl}
                alt="Add Meeting"
                width={27}
                height={27}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">{item.title}</h1>
              <p className="text-lg font-normal">{item.desc}</p>
            </div>
          </div>
        );
      })}
      <MeetingModal
        isOpen={meetingType === "isInstandMeeting"}
        onClose={() => setMeetingType(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
