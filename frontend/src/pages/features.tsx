import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  HStack,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import Layout from '../components/Layout/Layout';
import { motion } from 'framer-motion';
import {
  FiFileText,
  FiGlobe,
  FiBook,
  FiMessageSquare,
  FiAward,
  FiTrendingUp,
  FiRefreshCw,
  FiShield,
} from 'react-icons/fi';

const MotionBox = motion(Box);

const features = [
  {
    id: 1,
    title: 'AI Resume Parsing',
    description:
      'Our advanced AI technology analyzes your resume to extract key information about your skills, experience, and achievements. This enables us to provide personalized recommendations and generate tailored content for your portfolio website.',
    icon: FiFileText,
  },
  {
    id: 2,
    title: 'Portfolio Website Generation',
    description:
      'Transform your resume into a stunning portfolio website with just one click. Our AI generates a professional website that showcases your experience, projects, and skills in an engaging and visually appealing way.',
    icon: FiGlobe,
  },
  {
    id: 3,
    title: 'Course Recommendations',
    description:
      'Get personalized course suggestions based on your career goals and current skill set. We analyze your profile and recommend the most relevant courses to help you advance in your career path.',
    icon: FiBook,
  },
  {
    id: 4,
    title: 'Interview Preparation',
    description:
      'Practice with our AI-powered mock interviews and receive instant feedback on your responses. Improve your interview skills with industry-specific questions and expert guidance.',
    icon: FiMessageSquare,
  },
  {
    id: 5,
    title: 'Skill Assessment',
    description:
      'Evaluate your professional skills through comprehensive assessments. Identify areas for improvement and track your progress as you develop new competencies.',
    icon: FiAward,
  },
  {
    id: 6,
    title: 'Career Growth Insights',
    description:
      'Access data-driven insights about career opportunities and industry trends. Make informed decisions about your professional development with up-to-date market information.',
    icon: FiTrendingUp,
  },
  {
    id: 7,
    title: 'Regular Updates',
    description:
      'Your portfolio website and career resources are automatically updated to reflect your latest achievements and skills. Stay current with minimal effort.',
    icon: FiRefreshCw,
  },
  {
    id: 8,
    title: 'Privacy & Security',
    description:
      'Your data is protected with enterprise-grade security. We ensure your personal information and career details are kept private and secure.',
    icon: FiShield,
  },
];

const FeatureCard = ({ title, description, icon, index }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      bg={bgColor}
      p={6}
      rounded="xl"
      shadow="lg"
      _hover={{ transform: 'translateY(-5px)', shadow: '2xl' }}
      transition="all 0.3s"
    >
      <VStack align="start" spacing={4}>
        <HStack spacing={4}>
          <Icon as={icon} w={6} h={6} color="blue.500" />
          <Heading size="md">{title}</Heading>
        </HStack>
        <Text color="gray.600">{description}</Text>
      </VStack>
    </MotionBox>
  );
};

export default function Features() {
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
              Powerful Features for Your Career
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="3xl" mx="auto">
              Discover how our AI-powered platform can help you build a stronger
              professional presence and advance your career.
            </Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {features.map((feature, index) => (
              <FeatureCard key={feature.id} {...feature} index={index} />
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Layout>
  );
}
