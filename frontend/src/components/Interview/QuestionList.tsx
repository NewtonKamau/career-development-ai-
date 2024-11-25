import React from 'react';
import {
  VStack,
  Box,
  Text,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Skeleton,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useInterviewQuestions } from '../../hooks/useData';

export default function QuestionList() {
  const { questions, isLoading, isError } = useInterviewQuestions();

  if (isError) {
    return (
      <Alert status="error" borderRadius="md">
        <AlertIcon />
        Failed to load interview questions
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <VStack spacing={4} align="stretch">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} height="100px" borderRadius="md" />
        ))}
      </VStack>
    );
  }

  return (
    <Accordion allowMultiple>
      {questions?.map((question) => (
        <AccordionItem key={question.id}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontWeight="medium">{question.question}</Text>
                <Box mt={2}>
                  <Badge colorScheme="blue" mr={2}>
                    {question.category}
                  </Badge>
                  <Badge colorScheme="green" mr={2}>
                    {question.difficulty}
                  </Badge>
                  {question.industry && (
                    <Badge colorScheme="purple">{question.industry}</Badge>
                  )}
                </Box>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text color="gray.700">{question.answer}</Text>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
