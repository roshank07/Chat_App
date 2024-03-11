import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Tooltip,
  Avatar,
  MenuItem,
  MenuDivider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";

import React, { useRef, useState } from "react";
import { FaChevronDown, FaSearch, FaBell } from "react-icons/fa";
import { ChatState } from "../context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";

export default function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const toast = useToast();

  const handleSignOut = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  const handleSearch = async (e) => {
    if (!search) {
      toast({
        title: "Warning",
        description: "Please enter something to search",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/user/search_user?search=${search}`);
      const data = await response.json();
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const response = await fetch("/api/chat/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoadingChat(false);
    }
  };
  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip
          hasArrow
          label="Search Users to add"
          bg="gray.300"
          color="black"
        >
          <Button variant="ghost" ref={btnRef} onClick={onOpen}>
            <FaSearch />
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search Users
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Kura-Kani
        </Text>
        <div>
          <Menu>
            <MenuButton p={3}>
              <FaBell />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<FaChevronDown />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={handleSignOut}>Signout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      {/* <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open
      </Button> */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search Users</DrawerHeader>

          <DrawerBody>
            <Box display="flex" justifyContent="space-between" gap={2}>
              <Input
                placeholder="Enter email or name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => {
                return (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                );
              })
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
