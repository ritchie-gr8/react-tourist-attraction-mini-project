import axios from "axios";

const API_URL = "http://localhost:4001";

export const getTrips = async (keyword = "") => {
  try {
    const res = await axios.get(`${API_URL}/trips?keywords=${keyword}`);

    if (res.status !== 200 || !res?.data?.data) {
      throw new Error("Failed to fetch trips");
    }

    return res.data.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
