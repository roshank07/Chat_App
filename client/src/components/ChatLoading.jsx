import React from "react";
import { Stack, Skeleton } from "@chakra-ui/react";

export default function ChatLoading() {
  return (
    <div>
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    </div>
  );
}
