import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";
import PricingSection from "./components/PricingSection";
import ServicesSection from "./components/ServicesSection";
import TrustBar from "./components/TrustBar";

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
      </main>
    </>
  );
}

export default App;
