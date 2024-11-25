import Layout from '../components/Layout/Layout';
import Hero from '../components/Home/Hero';
import Features from '../components/Home/Features';
import ResumeSection from '../components/ResumeSection';
import CareerChat from '../components/CareerChat';
import { Box, Container, Heading, VStack, Divider } from '@chakra-ui/react';
import CourseList from '../components/Courses/CourseList';
import QuestionList from '../components/Interview/QuestionList';

export default function Home() {
  return (
    <Layout>
      <Box as="main">
        <Hero />
        <Features />
        <Box bg="gray.50" py={16}>
          <Container maxW="container.xl">
            <Heading as="h2" size="lg" mb={6}>
              Resume Upload & Portfolio Generator
            </Heading>
            <ResumeSection />
          </Container>
        </Box>
        <Box py={16}>
          <CareerChat />
        </Box>
        <Box bg="gray.50" py={16}>
          <Container maxW="container.xl" py={8}>
            <VStack spacing={8} align="stretch">
              <Box>
                <Heading as="h2" size="lg" mb={6}>
                  Recommended Courses
                </Heading>
                <CourseList />
              </Box>

              <Divider />

              <Box>
                <Heading as="h2" size="lg" mb={6}>
                  Interview Questions
                </Heading>
                <QuestionList />
              </Box>
            </VStack>
          </Container>
        </Box>
      </Box>
    </Layout>
  );
}
