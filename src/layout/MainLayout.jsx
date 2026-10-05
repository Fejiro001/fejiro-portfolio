import Header from "../components/Header";
import ContactFooter from "../components/ContactFooter";
import { Outlet } from "react-router-dom";
import NoiseOverlay from "../components/NoiseOverlay";

function MainLayout() {
  return (
    <>
      <NoiseOverlay />
      <Header />
      <main>
        <Outlet />
      </main>
      <ContactFooter />
    </>
  );
}

export default MainLayout;
