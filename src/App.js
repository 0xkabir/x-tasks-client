import { routes } from "./Routes/Routes";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/system";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container maxWidth='md'>
      <RouterProvider router={routes} />
      <Toaster/>
      <CssBaseline />
    </Container>
    </QueryClientProvider>
  );
}

export default App;
