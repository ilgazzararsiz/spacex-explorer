import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Launches from "./pages/launches";
import Header from "./components/Header";
import LaunchDetail from "./pages/launch";
import "./App.scss";

const App = () => {
  const client = new ApolloClient({
    uri: "https://spacex-production.up.railway.app/",
    cache: new InMemoryCache(),
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#FFBF00",
      },
    },
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Container maxWidth="md" sx={{ paddingBottom: 10 }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Launches />}></Route>
              <Route path="/launch/:id" element={<LaunchDetail />}></Route>
            </Routes>
          </BrowserRouter>
        </Container>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
