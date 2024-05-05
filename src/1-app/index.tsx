import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import { EditLetterPage } from "~/2-pages/edit";
import { LettersListPage } from "~/2-pages/list";
import { Header } from "~/3-widgets/header";
import "./index.css";
import "./reset.css";
import { store } from "./store";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 0 20px;

  @media (min-width: 1440px) {
    padding: 0;
  }
`;

Container.displayName = "Container";

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  padding-top: 32px;
  width: 1120px;
  padding-bottom: 120px;
`;

ContentContainer.displayName = "ContentContainer";

const PageContainer = styled.div`
  flex: 1 1 auto;
  width: 100%;
`;

PageContainer.displayName = "PageContainer";

const App = () => {
  const location = useLocation();

  // TODO: Move out routing into a separate file.
  // TODO: Create pathKeys object to manage URIs.
  // TODO: Animate page change with framer-motion or smth similar.
  return (
    <Container>
      <ContentContainer>
        <Header />
        <PageContainer>
          <Routes location={location} key={location.pathname}>
            <Route path="/letters/*">
              {/* Main page */}
              <Route index element={<LettersListPage />} />
              {/* New letter form */}
              <Route path="new" element={<EditLetterPage />} />
              {/* Edit existing letter form */}
              <Route path=":letterId" element={<EditLetterPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/letters" replace />} />
          </Routes>
        </PageContainer>
      </ContentContainer>
    </Container>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
