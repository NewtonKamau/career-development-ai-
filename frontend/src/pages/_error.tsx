import { Box, Heading, Text, Button, Container } from '@chakra-ui/react';
import { NextPageContext } from 'next';
import NextLink from 'next/link';

interface ErrorProps {
  statusCode?: number;
}

function Error({ statusCode }: ErrorProps) {
  return (
    <Container maxW="container.xl" py={20}>
      <Box textAlign="center">
        <Heading as="h1" size="2xl" mb={4}>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
        </Heading>
        <Text fontSize="xl" mb={8}>
          We apologize for the inconvenience. Please try again later.
        </Text>
        <Button
          as={NextLink}
          href="/"
          size="lg"
          colorScheme="blue"
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          transition="all 0.2s"
        >
          Return Home
        </Button>
      </Box>
    </Container>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
