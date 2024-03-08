import React, { useState } from "react";
import {
  Input,
  FormControl,
  FormLabel,
  InputRightElement,
  VStack,
  Button,
  InputGroup,
} from "@chakra-ui/react";
export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [pic, setPic] = useState(null);
  const handleShowClick = () => setShow(!show);
  const postPic = (curr_pic) => {
    setPic(curr_pic);
  };
  const handleSubmit = () => {};

  return (
    <VStack spacing="5px">
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          placeholder="Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          placeholder="johndoe@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="*******"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="*******"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic" isRequired>
        <FormLabel>Profile Picture</FormLabel>
        <Input
          pr="4.5rem"
          type="file"
          accept="image/*"
          onChange={(e) => postPic(e.target.files[0])}
        />
      </FormControl>
      <Button mt={15} colorScheme="teal" width={"100%"} onClick={handleSubmit}>
        Submit
      </Button>
    </VStack>
  );
}
