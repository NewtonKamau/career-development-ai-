import { Box, Spinner, Text, VStack } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="white"
    >
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text color="gray.600" fontSize="lg" fontWeight="medium">
          Loading...
        </Text>
      </VStack>
    </Box>
  );
}
