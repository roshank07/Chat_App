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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleShowClick = () => setShow(!show);

  const handleSubmit = () => {};

  return (
    <VStack spacing="5px">
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

      <Button mt={15} colorScheme="teal" width={"100%"} onClick={handleSubmit}>
        Submit
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width={"100%"}
        onClick={() => {
          setEmail("guest@email.com");
          setPassword("guest,123");
        }}
      >
        Get Guest user Credentials
      </Button>
    </VStack>
  );
}
