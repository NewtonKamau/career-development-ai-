import { useState, useRef } from 'react';
import {
  Box,
  VStack,
  Input,
  Button,
  Text,
  useToast,
  HStack,
  Avatar,
  Flex,
} from '@chakra-ui/react';
import { FiSend } from 'react-icons/fi';

interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function CareerChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      content: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      const aiMessage: Message = {
        content: data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get response from AI',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  return (
    <Box borderRadius="lg" borderWidth={1} p={4} h="500px" display="flex" flexDirection="column">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Career Assistant
      </Text>
      
      <VStack flex={1} overflowY="auto" spacing={4} mb={4} alignItems="stretch">
        {messages.map((message, index) => (
          <Flex
            key={index}
            justify={message.isUser ? 'flex-end' : 'flex-start'}
          >
            <HStack spacing={2} maxW="80%">
              {!message.isUser && (
                <Avatar size="sm" name="AI Assistant" bg="blue.500" />
              )}
              <Box
                bg={message.isUser ? 'blue.500' : 'gray.100'}
                color={message.isUser ? 'white' : 'black'}
                px={4}
                py={2}
                borderRadius="lg"
              >
                <Text>{message.content}</Text>
              </Box>
              {message.isUser && (
                <Avatar size="sm" name="User" bg="green.500" />
              )}
            </HStack>
          </Flex>
        ))}
        <div ref={messagesEndRef} />
      </VStack>

      <HStack as="form" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about career advice..."
          disabled={isLoading}
        />
        <Button
          colorScheme="blue"
          isLoading={isLoading}
          onClick={handleSend}
          leftIcon={<FiSend />}
        >
          Send
        </Button>
      </HStack>
    </Box>
  );
}
