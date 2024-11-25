import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme, Box, Spinner } from '@chakra-ui/react';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import Error from './_error';

const theme = extendTheme({
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  colors: {
    brand: {
      50: '#EBF8FF',
      100: '#BEE3F8',
      200: '#90CDF4',
      300: '#63B3ED',
      400: '#4299E1',
      500: '#3182CE',
      600: '#2B6CB0',
      700: '#2C5282',
      800: '#2A4365',
      900: '#1A365D',
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
});

function LoadingSpinner() {
  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  );
}

function ErrorFallback({ error }: { error: Error }) {
  return <Error statusCode={500} />;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ChakraProvider theme={theme}>
        <Suspense fallback={<LoadingSpinner />}>
          <Component {...pageProps} />
        </Suspense>
      </ChakraProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
