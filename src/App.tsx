import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { CustomThemeProvider } from "./context/ThemeContext";
import { Suspense } from "react";

// Layout
import Layout from "./components/layout/Layout";

// Pages
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import MarkdownViewer from "./components/MarkdownViewer/MarkdownViewer";

// Component to conditionally render content based on the current route
const AppContent = () => {
  const location = useLocation();

  // If the path starts with /docs, render the StandaloneMarkdownViewer
  if (location.pathname.startsWith("/docs")) {
    return (
      <MarkdownViewer
        apiBaseUrl="http://localhost:3300"
        basePath="/docs"
        hideFileTree={false}
        integrated={false}
      />
    );
  }

  // If the path starts with /md-docs, render the IntegratedMarkdownViewer
  if (location.pathname.startsWith("/md-docs")) {
    return (
      <MarkdownViewer
        apiBaseUrl="http://localhost:3300"
        basePath="/md-docs"
        hideFileTree={false}
        integrated={true}
      />
    );
  }
  // Otherwise render the regular routes
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <CustomThemeProvider>
      <div className="app">
        <BrowserRouter>
          <Layout>
            <Suspense fallback={<div>Loading...</div>}>
              <AppContent />
            </Suspense>
          </Layout>
        </BrowserRouter>
      </div>
    </CustomThemeProvider>
  );
}

export default App;
