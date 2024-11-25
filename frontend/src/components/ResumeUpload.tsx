import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Button,
  VStack,
  Text,
  useToast,
  Progress,
  Flex,
  Icon,
  CircularProgress,
  useColorModeValue,
  SlideFade,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FiUpload, FiFile, FiCheck } from 'react-icons/fi';

const bounceKeyframes = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

export default function ResumeUpload() {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const toast = useToast();

  // Theme colors
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('blue.400', 'blue.500');
  const hoverBorderColor = useColorModeValue('blue.500', 'blue.400');
  const iconColor = useColorModeValue('blue.500', 'blue.400');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    setUploadSuccess(false);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch('/api/resumes/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setUploadSuccess(true);
      toast({
        title: 'Resume uploaded successfully!',
        description: 'Your resume data has been processed.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });

      // Handle the parsed resume data
      console.log('Parsed resume data:', data);
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'There was an error uploading your resume.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setUploading(false);
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  return (
    <SlideFade in={true} offsetY="20px">
      <Box
        p={8}
        borderRadius="xl"
        borderWidth={2}
        borderStyle="dashed"
        borderColor={isDragActive ? hoverBorderColor : borderColor}
        bg={bgColor}
        transition="all 0.3s ease"
        _hover={{
          borderColor: hoverBorderColor,
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}
        {...getRootProps()}
        cursor="pointer"
        position="relative"
        overflow="hidden"
      >
        <VStack spacing={6}>
          <input {...getInputProps()} />
          
          <Box
            position="relative"
            sx={{
              animation: isDragActive ? `${bounceKeyframes} 1s ease infinite` : 'none'
            }}
          >
            <Flex
              h="120px"
              w="120px"
              borderRadius="full"
              bg={isDragActive ? 'blue.50' : 'transparent'}
              align="center"
              justify="center"
              transition="all 0.3s ease"
            >
              {uploading ? (
                <CircularProgress
                  isIndeterminate
                  color="blue.400"
                  thickness="4px"
                  size="60px"
                />
              ) : uploadSuccess ? (
                <Icon 
                  as={FiCheck} 
                  w={12} 
                  h={12} 
                  color="green.400"
                  transition="all 0.3s ease"
                />
              ) : (
                <Icon
                  as={FiUpload}
                  w={12}
                  h={12}
                  color={iconColor}
                  transition="all 0.3s ease"
                />
              )}
            </Flex>
          </Box>

          <VStack spacing={2}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color={textColor}
              textAlign="center"
              transition="all 0.3s ease"
            >
              {isDragActive
                ? 'Drop your resume here'
                : uploading
                ? 'Uploading...'
                : uploadSuccess
                ? 'Upload Complete!'
                : 'Upload your Resume'}
            </Text>
            <Text fontSize="sm" color="gray.500" textAlign="center">
              Drag and drop your resume or click to browse
            </Text>
            <Text fontSize="xs" color="gray.400">
              Supported formats: PDF, DOC, DOCX
            </Text>
          </VStack>

          {!uploading && !uploadSuccess && (
            <Button
              size="sm"
              colorScheme="blue"
              variant="outline"
              leftIcon={<FiFile />}
              onClick={(e) => e.stopPropagation()}
              transition="all 0.2s"
              _hover={{
                transform: 'translateY(-2px)',
                shadow: 'md',
              }}
            >
              Select File
            </Button>
          )}

          {uploading && (
            <Progress
              size="xs"
              isIndeterminate
              w="100%"
              colorScheme="blue"
              borderRadius="full"
            />
          )}
        </VStack>
      </Box>
    </SlideFade>
  );
}
