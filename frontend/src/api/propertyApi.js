import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Update this if needed

export const getAllProperties = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getPropertyById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };
  
export const addProperty = async (propertyData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(API_URL, propertyData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
};
