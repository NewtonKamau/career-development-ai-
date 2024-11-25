import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  UnorderedList,
  ListItem,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout/Layout';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

const PrivacyPolicy = () => {
  const sectionBg = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <Layout>
      <Container maxW="4xl" py={12}>
        <MotionBox
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <MotionHeading
            as="h1"
            size="2xl"
            mb={8}
            textAlign="center"
            bgGradient="linear(to-r, blue.400, purple.500)"
            backgroundClip="text"
            variants={itemVariants}
          >
            Privacy Policy
          </MotionHeading>

          <VStack spacing={8} align="stretch">
            <MotionBox variants={itemVariants}>
              <Heading size="md" mb={4}>
                Introduction
              </Heading>
              <Text>
                At AI Career Builder, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </Text>
            </MotionBox>

            <MotionBox
              variants={itemVariants}
              p={6}
              bg={sectionBg}
              rounded="xl"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <Heading size="md" mb={4}>
                Information We Collect
              </Heading>
              <UnorderedList spacing={3}>
                <ListItem>Personal information (name, email address, contact details)</ListItem>
                <ListItem>Resume and career-related information</ListItem>
                <ListItem>Usage data and analytics</ListItem>
                <ListItem>Device and browser information</ListItem>
              </UnorderedList>
            </MotionBox>

            <MotionBox variants={itemVariants}>
              <Heading size="md" mb={4}>
                How We Use Your Information
              </Heading>
              <Text mb={4}>We use the collected information for:</Text>
              <UnorderedList spacing={3}>
                <ListItem>Providing and improving our services</ListItem>
                <ListItem>Personalizing your experience</ListItem>
                <ListItem>Communicating with you</ListItem>
                <ListItem>Analyzing usage patterns</ListItem>
                <ListItem>Ensuring security and preventing fraud</ListItem>
              </UnorderedList>
            </MotionBox>

            <Divider />

            <MotionBox
              variants={itemVariants}
              p={6}
              bg={sectionBg}
              rounded="xl"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <Heading size="md" mb={4}>
                Data Security
              </Heading>
              <Text>
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </Text>
            </MotionBox>

            <MotionBox variants={itemVariants}>
              <Heading size="md" mb={4}>
                Third-Party Services
              </Heading>
              <Text>
                We may use third-party services for:
              </Text>
              <UnorderedList spacing={3} mt={4}>
                <ListItem>Analytics and tracking</ListItem>
                <ListItem>Payment processing</ListItem>
                <ListItem>Email communication</ListItem>
                <ListItem>Cloud storage</ListItem>
              </UnorderedList>
            </MotionBox>

            <MotionBox variants={itemVariants}>
              <Heading size="md" mb={4}>
                Your Rights
              </Heading>
              <Text mb={4}>You have the right to:</Text>
              <UnorderedList spacing={3}>
                <ListItem>Access your personal information</ListItem>
                <ListItem>Correct inaccurate data</ListItem>
                <ListItem>Request deletion of your data</ListItem>
                <ListItem>Opt-out of marketing communications</ListItem>
                <ListItem>Data portability</ListItem>
              </UnorderedList>
            </MotionBox>

            <Divider />

            <MotionBox variants={itemVariants}>
              <Heading size="md" mb={4}>
                Updates to Privacy Policy
              </Heading>
              <Text>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </Text>
            </MotionBox>

            <MotionBox variants={itemVariants}>
              <Heading size="md" mb={4}>
                Contact Us
              </Heading>
              <Text>
                If you have any questions about this Privacy Policy, please contact us at privacy@aicareerbuilder.com
              </Text>
            </MotionBox>

            <MotionBox
              variants={itemVariants}
              textAlign="center"
              color="gray.500"
              fontSize="sm"
              mt={8}
            >
              Last Updated: January 2024
            </MotionBox>
          </VStack>
        </MotionBox>
      </Container>
    </Layout>
  );
};

export default PrivacyPolicy;
