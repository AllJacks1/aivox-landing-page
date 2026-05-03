import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutSection from "./components/AboutSection";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";
import PricingSection from "./components/PricingSection";
import ServicesSection from "./components/ServicesSection";
import TrustBar from "./components/TrustBar";
import WhyChooseSection from "./components/WhyChooseSection";
import ServiceArticle from "./components/ServiceArticle";
import { HelmetProvider } from "react-helmet-async";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Main Landing Page */}
          <Route
            path="/"
            element={
              <main>
                <Hero />
                <TrustBar />
                <ServicesSection />
                <HowItWorks />
                <PricingSection />
                <WhyChooseSection />
                <FinalCTA />
                <AboutSection />
                <Footer />
              </main>
            }
          />

          {/* Dynamic Article Page */}
          <Route path="/services/:serviceId" element={<ServiceArticle />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
export default App;
