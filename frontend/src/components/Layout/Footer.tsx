import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  IconButton,
  Link,
} from '@chakra-ui/react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import NextLink from 'next/link';

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      mt="auto"
    >
      <Container
        as={Stack}
        maxW={'7xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}
      >
        <Stack direction={'row'} spacing={6}>
          <Link as={NextLink} href={'/about'}>About</Link>
          <Link as={NextLink} href={'/terms'}>Terms</Link>
          <Link as={NextLink} href={'/privacy'}>Privacy</Link>
          <Link as={NextLink} href={'/contact'}>Contact</Link>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'7xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>© 2023 AI Career Builder. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <IconButton
              aria-label="Twitter"
              icon={<FaTwitter />}
              size="md"
              color={'gray.500'}
              variant="ghost"
              _hover={{
                color: 'blue.500',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s"
            />
            <IconButton
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              size="md"
              color={'gray.500'}
              variant="ghost"
              _hover={{
                color: 'blue.500',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s"
            />
            <IconButton
              aria-label="GitHub"
              icon={<FaGithub />}
              size="md"
              color={'gray.500'}
              variant="ghost"
              _hover={{
                color: 'blue.500',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s"
            />
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
