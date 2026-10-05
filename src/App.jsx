import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WorkDetail from "./pages/WorkDetail";
import ScrollToTop from "./components/ScrollToTop";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<WorkDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

