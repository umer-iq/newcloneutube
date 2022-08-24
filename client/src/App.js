import Menu from './components/Menu'
import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import WebCam from './pages/WebCam';
import News from './pages/News';
import Search from './pages/Search';
import Accountdetails from './pages/Accountdetails';

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random"/>} />
                  <Route path="trends" element={<Home type="trend"/>} />
                  <Route path="subscriptions" element={<Home type="sub"/>} />
                  <Route path="signin" element={<SignIn />} />
                    <Route path='webcam' element={<WebCam/>}/>
                    <Route path='search' element={<Search/>}/>
                    <Route path='news' element={<News/>}/>
                    <Route path='accountdetails' element={<Accountdetails/>}/>
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
