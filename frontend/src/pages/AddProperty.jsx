import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProperty } from "../api/propertyApi";

const AddProperty = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !location || !image) {
      setError("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("image", image);

    try {
      await addProperty(formData);
      navigate("/"); // Redirect to Dashboard after successful listing
    } catch (error) {
      setError("Failed to add property. Try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Add Property</h1>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border p-2"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border p-2"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          List Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
