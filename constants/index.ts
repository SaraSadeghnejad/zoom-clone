export const sidebarLinks = [
  {
    label: "Home",
    route: "/",
    imgUrl: "/icons/Home.svg"
  },
  {
    label: "Upcoming",
    route: "/upcoming",
    imgUrl: "/icons/upcoming.svg"
  },
  {
    label: "Previous",
    route: "/previous",
    imgUrl: "/icons/previous.svg"
  },
  {
    label: "Recordings",
    route: "/recordings",
    imgUrl: "/icons/Video.svg"
  },
  {
    label: "Personal Room",
    route: "/personal-room",
    imgUrl: "/icons/add-personal.svg"
  }
];
export const cards = [
  {
    bgColor: "bg-orange-1",
    title: "New Meeting",
    desc: "Setup a new recording",
    imgUrl: "/icons/add-meeting.svg",
    meetingType: "isJoiningMeeting"
  },
  {
    bgColor: "bg-blue-1",
    title: "Join Meeting",
    desc: "via invitation link",
    imgUrl: "/icons/add-personal.svg",
    meetingType: "isScheduleMeeting"
  },
  {
    bgColor: "bg-purple-1",
    title: "Schedule Meeting",
    desc: "Plan your meeting",
    imgUrl: "/icons/schedule.svg",
    meetingType: "isScheduleMeeting"
  },
  {
    bgColor: "bg-yellow-1",
    title: "View Recordings",
    desc: "Meeting recordings",
    imgUrl: "/icons/Video.svg",
    meetingType: "isScheduleMeeting"
  }
];
