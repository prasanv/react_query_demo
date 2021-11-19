import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import Navbar from '../components/navbar'
import { 
  QueryClient,
  QueryClientProvider,
 } from "react-query";
 import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Navbar>
          <Component {...pageProps} />
        </Navbar>
      </ChakraProvider>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right"></ReactQueryDevtools>
    </QueryClientProvider>
  )
}

export default MyApp
