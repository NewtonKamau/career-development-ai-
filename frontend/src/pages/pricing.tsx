import {
  Box,
  Button,
  Container,
  Heading,
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';
import { FiCheck, FiX } from 'react-icons/fi';
import Layout from '../components/Layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import NextLink from 'next/link';

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionListItem = motion(ListItem);
const MotionBadge = motion(Badge);

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 1,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    }
  },
  tap: { scale: 0.95 },
};

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  isPopular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for trying out our services',
    features: [
      { text: 'Basic Resume Parsing', included: true },
      { text: 'Simple Portfolio Website', included: true },
      { text: 'Limited Course Recommendations', included: true },
      { text: 'Basic Interview Questions', included: true },
      { text: 'AI Career Chat (5 messages/day)', included: true },
      { text: 'Advanced Website Customization', included: false },
      { text: 'Priority Support', included: false },
      { text: 'Custom Domain', included: false },
    ],
    buttonText: 'Start Free',
  },
  {
    name: 'Pro',
    price: '$19/mo',
    description: 'Everything you need for career growth',
    features: [
      { text: 'Advanced Resume Parsing', included: true },
      { text: 'Professional Portfolio Website', included: true },
      { text: 'Unlimited Course Recommendations', included: true },
      { text: 'Advanced Interview Preparation', included: true },
      { text: 'AI Career Chat (Unlimited)', included: true },
      { text: 'Advanced Website Customization', included: true },
      { text: 'Priority Support', included: false },
      { text: 'Custom Domain', included: false },
    ],
    buttonText: 'Start Pro',
    isPopular: true,
  },
  {
    name: 'Enterprise',
    price: '$49/mo',
    description: 'Advanced features for serious professionals',
    features: [
      { text: 'Advanced Resume Parsing', included: true },
      { text: 'Professional Portfolio Website', included: true },
      { text: 'Unlimited Course Recommendations', included: true },
      { text: 'Advanced Interview Preparation', included: true },
      { text: 'AI Career Chat (Unlimited)', included: true },
      { text: 'Advanced Website Customization', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Custom Domain', included: true },
    ],
    buttonText: 'Contact Sales',
  },
];

const PricingCard = ({ tier, index }: { tier: PricingTier; index: number }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = tier.isPopular ? 'blue.400' : useColorModeValue('gray.200', 'gray.600');

  return (
    <MotionBox
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        y: -10,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300 }
      }}
      position="relative"
      bg={bgColor}
      p={6}
      rounded="xl"
      shadow="xl"
      borderWidth="2px"
      borderColor={borderColor}
      height="full"
      role="group"
    >
      <AnimatePresence>
        {tier.isPopular && (
          <MotionBadge
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: 1,
              rotate: 0,
              transition: {
                type: "spring",
                stiffness: 150,
                damping: 15
              }
            }}
            colorScheme="blue"
            position="absolute"
            top={-3}
            right={-3}
            rounded="full"
            px={3}
            py={1}
            fontSize="sm"
            textTransform="none"
          >
            Most Popular
          </MotionBadge>
        )}
      </AnimatePresence>

      <VStack spacing={4} align="stretch">
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.2 }}
        >
          <Text
            fontSize="xl"
            fontWeight="bold"
            color={useColorModeValue('gray.800', 'white')}
          >
            {tier.name}
          </Text>
          <Heading 
            size="2xl" 
            my={2}
            bgGradient={tier.isPopular ? "linear(to-r, blue.400, purple.500)" : "none"}
            backgroundClip={tier.isPopular ? "text" : "none"}
            color={tier.isPopular ? "transparent" : "inherit"}
          >
            {tier.price}
          </Heading>
          <Text color="gray.500" fontSize="sm">
            {tier.description}
          </Text>
        </MotionBox>

        <List spacing={3}>
          {tier.features.map((feature, featureIndex) => (
            <MotionListItem
              key={featureIndex}
              variants={listItemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: featureIndex * 0.1 }}
              display="flex"
              alignItems="center"
              color={feature.included ? 'inherit' : 'gray.400'}
            >
              <ListIcon
                as={feature.included ? FiCheck : FiX}
                color={feature.included ? 'green.400' : 'red.400'}
                boxSize={5}
                mr={2}
              />
              {feature.text}
            </MotionListItem>
          ))}
        </List>

        <MotionButton
          as={NextLink}
          href={tier.name === 'Enterprise' ? '/contact' : '/signup'}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          colorScheme={tier.isPopular ? 'blue' : 'gray'}
          size="lg"
          w="full"
          mt={4}
          bgGradient={tier.isPopular ? "linear(to-r, blue.400, purple.500)" : "none"}
          _hover={{
            bgGradient: tier.isPopular ? "linear(to-r, blue.500, purple.600)" : "none",
          }}
        >
          {tier.buttonText}
        </MotionButton>
      </VStack>
    </MotionBox>
  );
};

export default function Pricing() {
  return (
    <Layout>
      <Box as="section" py={20}>
        <Container maxW="7xl">
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 0.6 
            }}
            textAlign="center"
            mb={16}
          >
            <Heading
              as="h1"
              size="2xl"
              bgGradient="linear(to-r, blue.400, purple.500)"
              backgroundClip="text"
              mb={4}
            >
              Simple, Transparent Pricing
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="3xl" mx="auto">
              Choose the plan that best fits your needs. All plans include a 14-day
              free trial.
            </Text>
          </MotionBox>

          <MotionBox
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <SimpleGrid
              columns={{ base: 1, lg: 3 }}
              spacing={{ base: 8, lg: 10 }}
              alignItems="stretch"
            >
              {pricingTiers.map((tier, index) => (
                <PricingCard key={tier.name} tier={tier} index={index} />
              ))}
            </SimpleGrid>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            mt={16}
            p={8}
            bg={useColorModeValue('blue.50', 'blue.900')}
            rounded="xl"
            textAlign="center"
            whileHover={{ 
              scale: 1.02,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            <Heading size="md" mb={2}>
              Need a Custom Plan?
            </Heading>
            <Text color="gray.600" mb={4}>
              Contact us for custom pricing and features tailored to your specific needs.
            </Text>
            <MotionButton
              as={NextLink}
              href="/contact"
              variant="outline"
              colorScheme="blue"
              size="lg"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              Contact Sales
            </MotionButton>
          </MotionBox>
        </Container>
      </Box>
    </Layout>
  );
}
