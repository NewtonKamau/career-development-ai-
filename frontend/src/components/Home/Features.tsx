import {
  Container,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FiFileText,
  FiGlobe,
  FiBook,
  FiMessageSquare,
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionStack = motion(Stack);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);

interface FeatureProps {
  title: string;
  text: string;
  icon: React.ElementType;
  index: number;
}

const Feature = ({ title, text, icon, index }: FeatureProps) => {
  return (
    <MotionStack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      rounded={'xl'}
      p={{ base: 4, sm: 6, md: 8 }}
      spacing={{ base: 4 }}
      maxW={{ lg: 'lg' }}
      height="100%"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.2,
        ease: "easeOut"
      }}
      whileHover={{
        y: -8,
        boxShadow: "2xl",
        transition: { duration: 0.3 }
      }}
    >
      <MotionFlex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'blue.500'}
        rounded={'full'}
        bg={useColorModeValue('blue.50', 'blue.900')}
        mb={1}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: index * 0.2 + 0.3,
          type: "spring",
          stiffness: 200
        }}
      >
        <Icon as={icon} w={8} h={8} />
      </MotionFlex>
      <MotionText
        fontWeight={600}
        fontSize={'xl'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.2 + 0.4 }}
      >
        {title}
      </MotionText>
      <MotionText
        color={'gray.600'}
        fontSize={'lg'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.2 + 0.5 }}
      >
        {text}
      </MotionText>
    </MotionStack>
  );
};

export default function Features() {
  return (
    <Container py={12} maxW={'7xl'}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
        <Feature
          icon={FiFileText}
          title={'AI Resume Parsing'}
          text={
            'Smart resume analysis to extract your skills, experience, and achievements automatically.'
          }
          index={0}
        />
        <Feature
          icon={FiGlobe}
          title={'Website Generation'}
          text={
            'Create a professional portfolio website showcasing your experience and projects.'
          }
          index={1}
        />
        <Feature
          icon={FiBook}
          title={'Course Recommendations'}
          text={
            'Get personalized course suggestions to enhance your skills and advance your career.'
          }
          index={2}
        />
        <Feature
          icon={FiMessageSquare}
          title={'Interview Preparation'}
          text={
            'Practice with AI-powered mock interviews and get instant feedback to improve.'
          }
          index={3}
        />
      </SimpleGrid>
    </Container>
  );
}
