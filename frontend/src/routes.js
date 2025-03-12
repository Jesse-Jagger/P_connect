import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddProperty from "./pages/AddProperty";
import PropertyDetails from "./pages/PropertyDetails";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./pages/Register";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
