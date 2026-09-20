import NoiseOverlay from "../components/NoiseOverlay";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SelectedWork from "../components/SelectedWork";
import About from "../components/About";
import Technologies from "../components/Technologies";
import Currently from "../components/Currently";
import ContactFooter from "../components/ContactFooter";

function Home() {
  return (
    <>
      <NoiseOverlay />
      <Header />
      <main>
        <Hero />
        <SelectedWork />
        <About />
        <Technologies />
        <Currently />
        <ContactFooter />
      </main>
    </>
  );
}

export default Home;
