import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/chats" Component={ChatPage} />
      </Routes>
    </>
  );
}

export default App;
