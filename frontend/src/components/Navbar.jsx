import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-lg font-bold">Property Connect</Link>
      <div className="flex space-x-4">
        <Link to="/" className="hover:text-blue-300">Dashboard</Link>
        <Link to="/add-property" className="hover:text-blue-300">Add Property</Link>
        <Link to="/contact" className="hover:text-blue-300">Contact Us</Link>
      </div>
      <div className="flex space-x-4">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
            Logout
          </button>
        ) : (
          <>
            <Link to="/signup" className="bg-yellow-500 px-4 py-2 rounded">
              Sign Up
            </Link>
            <Link to="/login" className="bg-green-500 px-4 py-2 rounded">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
