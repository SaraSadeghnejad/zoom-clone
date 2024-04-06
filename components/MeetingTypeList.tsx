"use client"
import React, { useState } from "react";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import HomeCard from "./HomeCard";

const meetingStateList = () => {
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);
  const [values, setValues] = useState({
    dateTime: new Date(),
    description:'',
    link: ""
  });
  const { toast } = useToast();
  const router = useRouter();
  const [callDetails, setCallDetails] = useState<Call>();
  const user = useUser();
  const client = useStreamVideoClient();
  const createMeeting = async () => {
    if (!client || !user)
      return toast({ title: "theres is no client or user " });
    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Call failed");
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const decription = values.description || "instant meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            decription
          }
        }
      });
      setCallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({ title: "A meeting created" });
    } catch (err) {
      console.log(err);
      toast({ title: "A meeting creating failed " });
    }
  };
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        bgColor="bg-orange-1"
        title="New Meeting"
        desc="Setup a new recording"
        imgUrl="/icons/add-meeting.svg"
        handleClick={() => {
          setMeetingState("isInstantMeeting");
        }}
      />
      <HomeCard
        bgColor="bg-blue-1"
        title="Join Meeting"
        desc="via invitation link"
        imgUrl="/icons/add-personal.svg"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <HomeCard
        bgColor="bg-purple-1"
        title="Schedule Meeting"
        desc="Plan your meeting"
        imgUrl="/icons/schedule.svg"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        bgColor="bg-yellow-1"
        title="View Recordings"
        desc="Meeting recordings"
        imgUrl="/icons/Video.svg"
        handleClick={() => router.push("/recordings")}
      />
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default meetingStateList;
