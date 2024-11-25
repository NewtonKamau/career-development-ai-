import {
  Box,
  Flex,
  Button,
  Stack,
  useColorModeValue,
  useDisclosure,
  IconButton,
  Container,
  Link,
  HStack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

const Links = ['Features', 'Pricing', 'About'];

const NavLink = ({ children, href }: { children: string; href: string }) => (
  <Link
    as={NextLink}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('blue.50', 'blue.900'),
    }}
    href={href}
  >
    {children}
  </Link>
);

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={bgColor}
      px={4}
      position="fixed"
      w="full"
      top={0}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={borderColor}
      zIndex="sticky"
    >
      <Container maxW={'7xl'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          
          <HStack spacing={8} alignItems={'center'}>
            <Box fontWeight="bold" fontSize="xl" color="blue.500">
              CareerBuilder
            </Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link} href={`/${link.toLowerCase()}`}>
                  {link}
                </NavLink>
              ))}
            </HStack>
          </HStack>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
          >
            <Button
              as={NextLink}
              fontSize={'sm'}
              fontWeight={400}
              variant={'link'}
              href={'/signin'}
            >
              Sign In
            </Button>
            <Button
              as={NextLink}
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'blue.500'}
              href={'/signup'}
              _hover={{
                bg: 'blue.400',
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}
