import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import TrustBar from "./components/TrustBar";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar/>
      </main>
    </>
  );
}

export default App;
