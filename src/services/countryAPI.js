import axios from "axios";

//Fonction pour recuperer tous les pays de l'api et toutes leur données
const getAllCountries = async () => {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

//Fonction pour récuperer les pays qui correspondent a celui qu'on appelle dans la fonction
const getCountry = async(country) => {
    try{
        const response = await axios.get(`https://restcountries.com/v3.1/name/${country}`);
        return response.data;
    }catch(error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

//Foncion pour récuperer 3 pays aléatoirement pour la page Home
const getRandomCountry = async () => {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countries = response.data;
        const randomCountries = [];

        // Générer trois indices aléatoires uniques
        const indices = [];
        while (indices.length < 3) {
            const randomIndex = Math.floor(Math.random() * countries.length);
            if (!indices.includes(randomIndex)) {
                indices.push(randomIndex);
            }
        }

        // Récupérer les pays correspondant aux indices générés
        indices.forEach(index => {
            randomCountries.push(countries[index]);
        });

        return randomCountries;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export default {
    getAllCountries: getAllCountries,
    getCountry: getCountry,
    getRandomCountry: getRandomCountry
};