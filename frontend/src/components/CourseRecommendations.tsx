import { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  Text,
  SimpleGrid,
  Image,
  Badge,
  LinkBox,
  LinkOverlay,
  Skeleton,
  useToast,
  Flex,
  Icon,
  Tooltip,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { FiStar, FiUser } from 'react-icons/fi';

interface Course {
  id: number;
  title: string;
  platform: 'udemy' | 'coursera';
  imageUrl: string;
  rating: number;
  price?: string;
  url: string;
  skills: string[];
  instructor: string;
  description: string;
}

interface CourseResponse {
  success: boolean;
  courses: Course[];
  error?: string;
}

export default function CourseRecommendations() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/courses/recommendations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CourseResponse = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to load courses');
      }
      
      setCourses(data.courses);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load course recommendations';
      setError(message);
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <Alert status="error" borderRadius="lg">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box borderRadius="lg" borderWidth={1} p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Recommended Courses
      </Text>

      {loading ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} height="300px" borderRadius="lg" />
          ))}
        </SimpleGrid>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {courses.map((course) => (
            <LinkBox
              key={course.id}
              borderWidth={1}
              borderRadius="lg"
              overflow="hidden"
              _hover={{ shadow: 'md' }}
            >
              <Image
                src={course.imageUrl}
                alt={course.title}
                height="160px"
                width="100%"
                objectFit="cover"
                fallbackSrc="https://via.placeholder.com/300x160?text=Course+Image"
              />

              <Box p={4}>
                <Badge
                  colorScheme={course.platform === 'udemy' ? 'purple' : 'blue'}
                  mb={2}
                >
                  {course.platform.toUpperCase()}
                </Badge>

                <LinkOverlay href={course.url} isExternal>
                  <Text fontSize="lg" fontWeight="semibold" noOfLines={2} mb={2}>
                    {course.title}
                  </Text>
                </LinkOverlay>

                <Flex align="center" mb={2}>
                  <Tooltip label="Instructor">
                    <Flex align="center" mr={4}>
                      <Icon as={FiUser} mr={1} />
                      <Text fontSize="sm" noOfLines={1}>
                        {course.instructor}
                      </Text>
                    </Flex>
                  </Tooltip>

                  <Tooltip label="Rating">
                    <Flex align="center">
                      <Icon as={FiStar} color="yellow.400" mr={1} />
                      <Text fontSize="sm">{course.rating.toFixed(1)}</Text>
                    </Flex>
                  </Tooltip>
                </Flex>

                <Text fontSize="sm" color="gray.600" noOfLines={2} mb={3}>
                  {course.description}
                </Text>

                <Flex wrap="wrap" gap={2}>
                  {course.skills.slice(0, 3).map((skill) => (
                    <Badge
                      key={skill}
                      colorScheme="green"
                      variant="subtle"
                      fontSize="xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </Flex>

                {course.price && (
                  <Text
                    position="absolute"
                    top={4}
                    right={4}
                    bg="green.500"
                    color="white"
                    px={2}
                    py={1}
                    borderRadius="md"
                    fontSize="sm"
                    fontWeight="bold"
                  >
                    {course.price}
                  </Text>
                )}
              </Box>
            </LinkBox>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
