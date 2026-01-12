import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Tech from "./pages/Tech";
import Contact from '@/pages/Contact';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import About from "./pages/About";
import WorkExamples from "./pages/WorkExamples";
import ThankYou from "./pages/ThankYou";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/services"} component={Services} />
      <Route path={"/tech"} component={Tech} />
      <Route path={"/tech/work-examples"} component={WorkExamples} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path={"/about"} component={About} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <div className="background-container">
          <div className="background-overlay"></div>
          <div className="tech-lines">
            <div className="tech-line"></div>
            <div className="tech-line"></div>
            <div className="tech-line"></div>
            <div className="tech-line"></div>
            <div className="tech-line"></div>
            <div className="tech-line-vertical"></div>
            <div className="tech-line-vertical"></div>
            <div className="tech-line-vertical"></div>
            <div className="tech-line-vertical"></div>
            <div className="tech-line-vertical"></div>
          </div>
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        <TooltipProvider>
          <Toaster />
          <div className="relative z-10 flex flex-col min-h-screen">
            <ScrollToTop />
            <Navbar />
            <main className="flex-grow">
              <Router />
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
