import { useUser } from "@clerk/nextjs";
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User
} from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";

const apiKey = process.env.NEXT_STREAM_API_KEY;
const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();
  useEffect(()=>{
    if(!isLoaded || !user) return;
    if(!apiKey) throw new Error(`API key not provided`);
    const client = new StreamVideoClient({ apiKey,
        user:{
            id:user?.id,
            name:user?.username || user?.id,
            image:user?.imageUrl
        }
    }
    )
  },[user,isLoaded]);
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>{children}</StreamCall>
    </StreamVideo>
  );
};
export default StreamVideoProvider;
