import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <img src={`http://localhost:5000/uploads/${property.image}`} alt={property.title} className="w-full h-40 object-cover rounded-md" />
      <h2 className="text-xl font-semibold mt-2">{property.title}</h2>
      <p className="text-gray-600">{property.location}</p>
      <p className="text-green-600 font-bold">${property.price}</p>
      <Link to={`/property/${property.id}`} className="mt-2 inline-block bg-blue-500 text-white py-1 px-3 rounded">
        View Details
      </Link>
    </div>
  );
};

export default PropertyCard;
