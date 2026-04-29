import Hero from "./components/Hero";
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
      </main>
    </>
  );
}

export default App;
