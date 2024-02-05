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

const getCountry = async(country) => {
    try{
        if (country.length <= 3) {
            throw new Error("Le nom du pays doit avoir plus de 3 caractères.");
        }

        const response = await axios.get(`https://restcountries.com/v3.1/name/${country}`);
        return response.data;
    }catch(error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export default {
    getAllCountries: getAllCountries,
    getCountry: getCountry
};