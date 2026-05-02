import { Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Loader from "./components/Loader.jsx";
import { BookmarkProvider } from "./context/BookmarkContext.jsx";
import { NewsProvider } from "./context/NewsContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BookmarkProvider>
          <NewsProvider>
            <Suspense fallback={<Loader label="Preparing dashboard" />}>
              <AppRoutes />
            </Suspense>
          </NewsProvider>
        </BookmarkProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
