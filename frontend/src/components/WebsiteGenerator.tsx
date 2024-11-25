import { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Text,
  useToast,
  Spinner,
  useColorModeValue,
  Flex,
  Heading,
  Badge,
  Divider,
} from '@chakra-ui/react';
import { FiGlobe } from 'react-icons/fi';

interface WebsiteSection {
  id: string;
  type: string;
  content: string;
}

interface WebsiteTheme {
  primary: string;
  secondary: string;
  font: string;
}

interface WebsitePreview {
  title: string;
  sections: WebsiteSection[];
  theme: WebsiteTheme;
}

export default function WebsiteGenerator() {
  const [loading, setLoading] = useState(false);
  const [website, setWebsite] = useState<WebsitePreview | null>(null);
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('blue.400', 'blue.500');
  const sectionBg = useColorModeValue('gray.50', 'gray.700');

  const generateWebsite = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/website/generate', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to generate website');
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate website');
      }

      setWebsite(data.website);
      toast({
        title: 'Website Generated!',
        description: 'Your portfolio website has been generated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Generation Failed',
        description: error instanceof Error ? error.message : 'Failed to generate website',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <Text key={index} mb={line.trim() ? 2 : 1}>
        {line || '\u00A0'}
      </Text>
    ));
  };

  return (
    <VStack spacing={4} w="full" h="full">
      <Button
        leftIcon={loading ? <Spinner size="sm" /> : <FiGlobe />}
        colorScheme="blue"
        onClick={generateWebsite}
        isLoading={loading}
        loadingText="Generating..."
        size="lg"
        width="full"
      >
        Generate Portfolio Website
      </Button>

      {website && (
        <Box
          w="full"
          borderWidth="2px"
          borderColor={borderColor}
          borderRadius="lg"
          p={4}
          bg={bgColor}
          overflowY="auto"
          maxH="600px"
          shadow="md"
        >
          <VStack spacing={6} align="start">
            <Box w="full" textAlign="center" py={4}>
              <Heading size="lg" mb={2}>{website.title}</Heading>
              <Badge colorScheme="blue" fontSize="md">
                Theme: {website.theme.font}
              </Badge>
            </Box>

            <Divider />

            {website.sections.map((section) => (
              <Box key={section.id} w="full" p={4} bg={sectionBg} borderRadius="md">
                <Heading size="md" mb={4} color={website.theme.primary}>
                  {section.type}
                </Heading>
                <Box>{formatContent(section.content)}</Box>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </VStack>
  );
}
