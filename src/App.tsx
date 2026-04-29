import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";
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
      </main>
    </>
  );
}

export default App;
