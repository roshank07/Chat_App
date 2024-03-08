import React from "react";
import { Container, Box, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function HomePage() {
  return (
    <Container maxW="xl" centerContent>
      <Box
        padding="4"
        background="white"
        w="100%"
        borderRadius="lg"
        borderWidth="1px"
        display="flex"
        margin="40px 0 15px 0"
        justifyContent="center"
      >
        <Text fontSize="4xl" fontFamily="work sans" color="black">
          Kura-Kaani
        </Text>
      </Box>
      <Box
        padding="4"
        background="white"
        color="black"
        w="100%"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Tabs variant="soft-rounded">
          <TabList marginBottom="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
