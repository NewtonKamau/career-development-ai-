import { Box, Spinner, Text, VStack } from '@chakra-ui/react';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <Box
      height="100%"
      width="100%"
      minHeight="200px"
      display="flex"
      alignItems="center"
      justifyContent="center"
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
          {message}
        </Text>
      </VStack>
    </Box>
  );
}
