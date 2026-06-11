import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Keep Home as static (needed immediately)
import Home from "./pages/Home";

// Lazy load everything else
const Cities = lazy(() => import("./pages/Cities"));
const About = lazy(() => import("./pages/About"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const Apply = lazy(() => import("./pages/Apply"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Calculator = lazy(() => import("./pages/Calculator"));

// Loan pages
const FHA = lazy(() => import("./pages/loans/FHA"));
const VA = lazy(() => import("./pages/loans/VA"));
const Conventional = lazy(() => import("./pages/loans/Conventional"));
const FirstTimeBuyer = lazy(() => import("./pages/loans/FirstTimeBuyer"));
const Refinance = lazy(() => import("./pages/loans/Refinance"));
const DSCR = lazy(() => import("./pages/loans/DSCR"));
const Jumbo = lazy(() => import("./pages/loans/Jumbo"));
const USDA = lazy(() => import("./pages/loans/USDA"));

// Blog pages
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

// City pages
const Celina = lazy(() => import("./pages/cities/Celina"));
const Prosper = lazy(() => import("./pages/cities/Prosper"));
const Frisco = lazy(() => import("./pages/cities/Frisco"));
const McKinney = lazy(() => import("./pages/cities/McKinney"));
const Anna = lazy(() => import("./pages/cities/Anna"));
const Melissa = lazy(() => import("./pages/cities/Melissa"));
const Aubrey = lazy(() => import("./pages/cities/Aubrey"));
const Gunter = lazy(() => import("./pages/cities/Gunter"));
const LittleElm = lazy(() => import("./pages/cities/LittleElm"));
const Plano = lazy(() => import("./pages/cities/Plano"));
const Allen = lazy(() => import("./pages/cities/Allen"));
const Denton = lazy(() => import("./pages/cities/Denton"));
const Wylie = lazy(() => import("./pages/cities/Wylie"));
const Lewisville = lazy(() => import("./pages/cities/Lewisville"));
const TheColony = lazy(() => import("./pages/cities/TheColony"));

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: "oklch(0.975 0.008 85)" }} />}>
      <Switch>
        {/* Core */}
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/cities" component={Cities} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/terms" component={Terms} />
        <Route path="/thank-you" component={ThankYou} />
        <Route path="/apply" component={Apply} />
        <Route path="/faq" component={FAQ} />
        <Route path="/calculator" component={Calculator} />

        {/* Blog */}
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />

        {/* Loan pages */}
        <Route path="/loans/fha" component={FHA} />
        <Route path="/loans/va" component={VA} />
        <Route path="/loans/conventional" component={Conventional} />
        <Route path="/loans/first-time-buyer" component={FirstTimeBuyer} />
        <Route path="/loans/refinance" component={Refinance} />
        <Route path="/loans/dscr" component={DSCR} />
        <Route path="/loans/jumbo" component={Jumbo} />
        <Route path="/loans/usda" component={USDA} />

        {/* City pages */}
        <Route path="/cities/celina" component={Celina} />
        <Route path="/cities/prosper" component={Prosper} />
        <Route path="/cities/frisco" component={Frisco} />
        <Route path="/cities/mckinney" component={McKinney} />
        <Route path="/cities/anna" component={Anna} />
        <Route path="/cities/melissa" component={Melissa} />
        <Route path="/cities/aubrey" component={Aubrey} />
        <Route path="/cities/gunter" component={Gunter} />
        <Route path="/cities/little-elm" component={LittleElm} />
        <Route path="/cities/plano" component={Plano} />
        <Route path="/cities/allen" component={Allen} />
        <Route path="/cities/denton" component={Denton} />
        <Route path="/cities/wylie" component={Wylie} />
        <Route path="/cities/lewisville" component={Lewisville} />
        <Route path="/cities/the-colony" component={TheColony} />

        {/* 404 */}
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
