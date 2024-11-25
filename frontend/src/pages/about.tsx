import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Image,
  useColorModeValue,
  Icon,
  HStack,
} from '@chakra-ui/react';
import Layout from '../components/Layout/Layout';
import { motion } from 'framer-motion';
import { FiTarget, FiUsers, FiAward } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const values = [
  {
    id: 1,
    title: 'Innovation',
    description: 'We leverage cutting-edge AI technology to provide the best career development tools.',
    icon: FiTarget,
  },
  {
    id: 2,
    title: 'User-Centric',
    description: 'Every feature is designed with our users\' success in mind.',
    icon: FiUsers,
  },
  {
    id: 3,
    title: 'Excellence',
    description: 'We strive for excellence in every aspect of our service.',
    icon: FiAward,
  },
];

const ValueCard = ({ title, description, icon, index }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
      </VStack>
    </MotionBox>
  );
};

export default function About() {
  return (
    <Layout>
      <Box as="section" py={20}>
        <Container maxW="7xl">
          {/* Hero Section */}
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
              About AI Career Builder
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="3xl" mx="auto">
              We're on a mission to revolutionize career development through AI technology.
            </Text>
          </MotionBox>

          {/* Mission Section */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={20}>
            <MotionVStack
              align="start"
              spacing={6}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Heading size="lg">Our Mission</Heading>
              <Text color="gray.600" fontSize="lg">
                At AI Career Builder, we believe that everyone deserves access to powerful career development tools. 
                Our platform combines artificial intelligence with career expertise to help professionals build 
                compelling portfolios, enhance their skills, and advance their careers.
              </Text>
              <Text color="gray.600" fontSize="lg">
                We're committed to making professional growth accessible, efficient, and effective through 
                innovative technology and personalized guidance.
              </Text>
            </MotionVStack>
            <MotionBox
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Image
                src="/about-image.svg"
                alt="About AI Career Builder"
                rounded="xl"
                shadow="2xl"
              />
            </MotionBox>
          </SimpleGrid>

          {/* Values Section */}
          <Box mb={20}>
            <Heading size="lg" mb={8} textAlign="center">
              Our Values
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {values.map((value, index) => (
                <ValueCard key={value.id} {...value} index={index} />
              ))}
            </SimpleGrid>
          </Box>

          {/* Stats Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            bg={useColorModeValue('blue.50', 'blue.900')}
            rounded="xl"
            p={8}
          >
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              <VStack>
                <Heading size="2xl" color="blue.500">
                  10K+
                </Heading>
                <Text fontWeight="bold">Users Helped</Text>
              </VStack>
              <VStack>
                <Heading size="2xl" color="blue.500">
                  50K+
                </Heading>
                <Text fontWeight="bold">Portfolios Generated</Text>
              </VStack>
              <VStack>
                <Heading size="2xl" color="blue.500">
                  95%
                </Heading>
                <Text fontWeight="bold">Satisfaction Rate</Text>
              </VStack>
            </SimpleGrid>
          </MotionBox>
        </Container>
      </Box>
    </Layout>
  );
}
