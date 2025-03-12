import { useState, useEffect } from "react";
import { getAllProperties } from "../api/propertyApi";
import PropertyCard from "../components/PropertyCard";

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getAllProperties();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Available Properties</h1>
      {loading ? (
        <p className="text-center">Loading properties...</p>
      ) : properties.length === 0 ? (
        <p className="text-center">No properties listed yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
