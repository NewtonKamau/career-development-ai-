import { Box, Flex } from '@chakra-ui/react';
import ResumeUpload from './ResumeUpload';
import WebsiteGenerator from './WebsiteGenerator';

export default function ResumeSection() {
  return (
    <Flex gap={6} w="full" minH="400px">
      <Box flex="1" maxW="50%">
        <ResumeUpload />
      </Box>
      <Box flex="1" maxW="50%">
        <WebsiteGenerator />
      </Box>
    </Flex>
  );
}
