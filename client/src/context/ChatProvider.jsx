import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setuser] = useState();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const userVerification = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const response = await fetch("/api/user/cookie-verify");
      if (response.ok) {
        if (!userInfo) {
          navigate("/");
        } else {
          setuser(userInfo);
        }
      } else {
        navigate("/");
      }
    };
    userVerification();
  }, [navigate]);
  // console.log(user);

  return (
    <ChatContext.Provider
      value={{
        user,
        setuser,
        chats,
        notification,
        setChats,
        selectedChat,
        setSelectedChat,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
