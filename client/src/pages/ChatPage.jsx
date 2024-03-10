import React from "react";
import { ChatState } from "../context/ChatProvider";
import { Box } from "@chakra-ui/react";

export default function ChatPage() {
  const { user } = ChatState();
  return (
    <div>
      {/* {user&&<SideDrawer/>} */}
      <Box>
        {/* {user&&<MyChats/>} */}
        {/* {user&&<ChatBox/>} */}
      </Box>
    </div>
  );
}
