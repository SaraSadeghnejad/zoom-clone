"use client";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import HomeCard from "./HomeCard";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "./ui/input";
import { useState } from "react";
const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
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
       if (!values.dateTime) {
         toast({ title: "Please select a date and time" });
         return;
       }
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
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copied" });
          }}
          image={"/icons/checked.svg"}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}
      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>
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

export default MeetingTypeList;
