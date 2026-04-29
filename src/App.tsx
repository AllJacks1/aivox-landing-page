import AboutSection from "./components/AboutSection";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";
import PricingSection from "./components/PricingSection";
import ServicesSection from "./components/ServicesSection";
import TrustBar from "./components/TrustBar";
import WhyChooseSection from "./components/WhyChooseSection";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar/>
        <ServicesSection/>
        <HowItWorks/>
        <PricingSection/>
        <WhyChooseSection/>
        <AboutSection/>
      </main>
    </>
  );
}

export default App;
