import React, { useState } from "react";
import {
  Input,
  FormControl,
  FormLabel,
  InputRightElement,
  VStack,
  Button,
  InputGroup,
  Alert,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleShowClick = () => setShow(!show);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        setErrorMessage(null);
        navigate("/chats");
      } else {
        setErrorMessage(data.message);
        setLoading(false);
        return;
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          placeholder="johndoe@example.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="*******"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        mt={15}
        colorScheme="teal"
        width={"100%"}
        onClick={handleSubmit}
        isLoading={loading}
      >
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
      {errorMessage && <Alert status="error">{errorMessage}</Alert>}
    </VStack>
  );
}
