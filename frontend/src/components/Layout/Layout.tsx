import { Box, Flex } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Flex minH="100vh" direction="column">
      <Header />
      <Box as="main" flex={1} mt="16">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}
