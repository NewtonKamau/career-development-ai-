import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  SimpleGrid,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { motion } from 'framer-motion';
import { FiMail, FiMessageSquare, FiClock } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const contactInfo = [
  {
    id: 1,
    title: 'Email Us',
    description: 'Get in touch with our support team',
    icon: FiMail,
    detail: 'support@aicareerbuilder.com',
  },
  {
    id: 2,
    title: 'Live Chat',
    description: 'Chat with our AI assistant',
    icon: FiMessageSquare,
    detail: 'Available 24/7',
  },
  {
    id: 3,
    title: 'Response Time',
    description: 'We aim to respond quickly',
    icon: FiClock,
    detail: 'Within 24 hours',
  },
];

const ContactCard = ({ title, description, icon, detail, index }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      bg={useColorModeValue('white', 'gray.800')}
      p={6}
      rounded="xl"
      shadow="lg"
      _hover={{ transform: 'translateY(-5px)', shadow: '2xl' }}
      transition="all 0.3s"
    >
      <VStack align="start" spacing={4}>
        <Icon as={icon} w={6} h={6} color="blue.500" />
        <Heading size="md">{title}</Heading>
        <Text color="gray.600">{description}</Text>
        <Text color="blue.500" fontWeight="bold">
          {detail}
        </Text>
      </VStack>
    </MotionBox>
  );
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement actual form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: 'Message Sent!',
        description: "We'll get back to you as soon as possible.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Layout>
      <Box as="section" py={20}>
        <Container maxW="7xl">
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            textAlign="center"
            mb={16}
          >
            <Heading
              as="h1"
              size="2xl"
              bgGradient="linear(to-r, blue.400, blue.600)"
              backgroundClip="text"
              mb={4}
            >
              Get in Touch
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="3xl" mx="auto">
              Have questions or feedback? We'd love to hear from you.
            </Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={16}>
            {contactInfo.map((info, index) => (
              <ContactCard key={info.id} {...info} index={index} />
            ))}
          </SimpleGrid>

          <MotionVStack
            as="form"
            onSubmit={handleSubmit}
            spacing={8}
            maxW="2xl"
            mx="auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                />
              </FormControl>
            </SimpleGrid>

            <FormControl isRequired>
              <FormLabel>Subject</FormLabel>
              <Input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                minH="200px"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              w="full"
              isLoading={isSubmitting}
              loadingText="Sending..."
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Send Message
            </Button>
          </MotionVStack>
        </Container>
      </Box>
    </Layout>
  );
}
