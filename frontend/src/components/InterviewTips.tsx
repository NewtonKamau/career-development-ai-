import { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Heading,
  Badge,
  Skeleton,
  useToast,
  Flex,
  Tag,
  TagLabel,
  Alert,
  AlertIcon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

interface InterviewQuestion {
  id: number;
  question: string;
  answer: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  industry: string;
  tags: string[];
  popularity: number;
}

interface InterviewResponse {
  success: boolean;
  questions: InterviewQuestion[];
  error?: string;
}

export default function InterviewTips() {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/interviews/questions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: InterviewResponse = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to load interview questions');
      }

      setQuestions(data.questions);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load interview questions';
      setError(message);
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'green';
      case 'intermediate':
        return 'yellow';
      case 'advanced':
        return 'red';
      default:
        return 'gray';
    }
  };

  if (error) {
    return (
      <Alert status="error" borderRadius="lg">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box borderRadius="lg" borderWidth={1} p={4}>
      <Heading size="lg" mb={6}>
        Interview Questions & Tips
      </Heading>

      {loading ? (
        <VStack spacing={4} align="stretch">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} height="200px" borderRadius="lg" />
          ))}
        </VStack>
      ) : (
        <Accordion allowMultiple>
          {questions.map((q) => (
            <AccordionItem key={q.id} borderWidth={1} borderRadius="lg" mb={4}>
              <AccordionButton py={4}>
                <Box flex="1" textAlign="left">
                  <Flex justify="space-between" align="center" wrap="wrap" gap={2}>
                    <Text fontSize="lg" fontWeight="semibold">
                      {q.question}
                    </Text>
                    <Flex gap={2} align="center">
                      <Badge
                        colorScheme={getDifficultyColor(q.difficulty)}
                        px={2}
                        py={1}
                        borderRadius="full"
                      >
                        {q.difficulty}
                      </Badge>
                      <Badge colorScheme="purple" px={2} py={1} borderRadius="full">
                        {q.category}
                      </Badge>
                    </Flex>
                  </Flex>
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <VStack align="start" spacing={4}>
                  <Text whiteSpace="pre-wrap">{q.answer}</Text>

                  <Flex wrap="wrap" gap={2}>
                    <Badge colorScheme="blue" px={2} py={1} borderRadius="full">
                      {q.industry}
                    </Badge>
                    {q.tags.map((tag) => (
                      <Tag
                        key={tag}
                        size="sm"
                        variant="subtle"
                        colorScheme="cyan"
                        borderRadius="full"
                      >
                        <TagLabel>{tag}</TagLabel>
                      </Tag>
                    ))}
                  </Flex>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </Box>
  );
}
