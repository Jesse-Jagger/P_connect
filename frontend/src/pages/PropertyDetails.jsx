import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPropertyById } from "../api/propertyApi";

const PropertyDetails = () => {
  const { id } = useParams(); // Get property ID from URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(""); // Simulated contact message

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleContactSeller = () => {
    setMessage("Seller has been notified!");
    setTimeout(() => setMessage(""), 3000); // Clear message after 3 sec
  };

  if (loading) return <p className="text-center mt-4">Loading property details...</p>;
  if (!property) return <p className="text-center mt-4">Property not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{property.title}</h1>
      <img 
        src={`http://localhost:5000/uploads/${property.image}`} 
        alt={property.title} 
        className="w-full h-64 object-cover rounded-md mt-2" 
      />
      <p className="text-gray-600 mt-2">{property.location}</p>
      <p className="text-green-600 font-bold">${property.price}</p>

      <button 
        onClick={handleContactSeller} 
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Contact Seller
      </button>

      {message && <p className="text-green-600 mt-2">{message}</p>}
    </div>
  );
};

export default PropertyDetails;
