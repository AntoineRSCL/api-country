import axios from "axios";

const getAllCountries = async () => {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export default {
    getAllCountries: getAllCountries
};