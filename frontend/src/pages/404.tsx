import { Box, Heading, Text, Button, Container, Icon } from '@chakra-ui/react';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import { FiHome, FiAlertCircle } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

export default function Custom404() {
  return (
    <Container maxW="container.xl" py={20}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        textAlign="center"
      >
        <MotionBox
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          mb={8}
        >
          <Icon as={FiAlertCircle} w={20} h={20} color="blue.500" />
        </MotionBox>

        <MotionHeading
          as="h1"
          size="2xl"
          mb={4}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          404 - Page Not Found
        </MotionHeading>

        <MotionText
          fontSize="xl"
          mb={8}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Oops! The page you're looking for doesn't exist.
        </MotionText>

        <MotionButton
          as={NextLink}
          href="/"
          size="lg"
          colorScheme="blue"
          leftIcon={<FiHome />}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Return Home
        </MotionButton>
      </MotionBox>
    </Container>
  );
}
