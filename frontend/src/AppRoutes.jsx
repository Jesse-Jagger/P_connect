import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import routes from "./routes"; // Import defined routes

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
