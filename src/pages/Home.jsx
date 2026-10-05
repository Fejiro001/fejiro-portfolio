import Hero from "../components/Hero";
import SelectedWork from "../components/SelectedWork";
import About from "../components/About";
import Technologies from "../components/Technologies";
import Currently from "../components/Currently";

function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <About />
      <Technologies />
      <Currently />
    </>
  );
}

export default Home;
