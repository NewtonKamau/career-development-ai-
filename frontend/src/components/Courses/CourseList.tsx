import React from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  Image,
  Link,
  VStack,
  Badge,
  Skeleton,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useCourseRecommendations } from '../../hooks/useData';

export default function CourseList() {
  const { courses, isLoading, isError } = useCourseRecommendations();

  if (isError) {
    return (
      <Alert status="error" borderRadius="md">
        <AlertIcon />
        Failed to load course recommendations
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} height="200px" borderRadius="md" />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {courses?.map((course) => (
        <Box
          key={course.id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          _hover={{ shadow: 'md' }}
          transition="all 0.2s"
        >
          <Image
            src={course.imageUrl}
            alt={course.title}
            height="160px"
            width="100%"
            objectFit="cover"
            fallbackSrc="https://via.placeholder.com/300x160?text=Course+Image"
          />
          <VStack p={4} align="start" spacing={2}>
            <Link
              href={course.url}
              isExternal
              fontWeight="semibold"
              noOfLines={2}
              color="blue.600"
              _hover={{ color: 'blue.700' }}
            >
              {course.title}
            </Link>
            <Text fontSize="sm" color="gray.600">
              Platform: {course.platform}
            </Text>
            {course.price && (
              <Text fontSize="sm" fontWeight="medium">
                {course.price}
              </Text>
            )}
            {course.skills?.length > 0 && (
              <Box>
                {course.skills.slice(0, 3).map((skill, index) => (
                  <Badge
                    key={index}
                    mr={2}
                    mb={2}
                    colorScheme="blue"
                    variant="subtle"
                  >
                    {skill}
                  </Badge>
                ))}
              </Box>
            )}
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
}
