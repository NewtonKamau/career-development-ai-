import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiUpload } from 'react-icons/fi';
import NextLink from 'next/link';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionStack = motion(Stack);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Hero() {
  return (
    <Container maxW={'7xl'}>
      <MotionStack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        <MotionStack
          flex={1}
          spacing={{ base: 5, md: 10 }}
          variants={staggerChildren}
        >
          <MotionBox variants={fadeInUp}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
            >
              <MotionText
                as={'span'}
                position={'relative'}
                color={'blue.400'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: '30%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'blue.100',
                  zIndex: -1,
                }}
                variants={fadeInUp}
              >
                Kickstart Your
              </MotionText>
              <br />
              <MotionText
                as={'span'}
                color={'blue.500'}
                variants={fadeInUp}
              >
                Career Journey Today!
              </MotionText>
            </Heading>
          </MotionBox>

          <MotionText
            color={'gray.500'}
            fontSize={{ base: 'lg', lg: 'xl' }}
            variants={fadeInUp}
          >
            AI-powered tools to help you build a professional website, find the best
            courses, and ace your interviews. Upload your resume to get started!
          </MotionText>

          <MotionStack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row' }}
            variants={fadeInUp}
          >
            <MotionButton
              as={NextLink}
              href="/upload"
              rounded={'full'}
              size={'lg'}
              fontWeight={'bold'}
              px={6}
              colorScheme={'blue'}
              leftIcon={<Icon as={FiUpload} h={4} w={4} />}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Upload Resume
            </MotionButton>
            <MotionButton
              as={NextLink}
              href="/features"
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              leftIcon={<PlayIcon h={4} w={4} />}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </MotionButton>
          </MotionStack>
        </MotionStack>

        <MotionFlex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}
          variants={fadeInUp}
        >
          <MotionBox
            position={'relative'}
            height={'300px'}
            rounded={'2xl'}
            boxShadow={'2xl'}
            width={'full'}
            overflow={'hidden'}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              ease: "easeOut"
            }}
          >
            <Image
              alt={'Hero Image'}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={'100%'}
              src={'/hero-image.svg'}
            />
          </MotionBox>
        </MotionFlex>
      </MotionStack>
    </Container>
  );
}

const PlayIcon = ({ h, w }: { h: number; w: number }) => {
  return (
    <Icon viewBox="0 0 24 24" h={h} w={w}>
      <path
        fill="currentColor"
        d="M8 5v14l11-7z"
      />
    </Icon>
  );
};
