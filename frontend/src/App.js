import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddProperty from "./pages/AddProperty";
import PropertyDetails from "./pages/PropertyDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
