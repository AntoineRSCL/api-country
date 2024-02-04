import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import countryAPI from "../services/countryAPI";

const DetailCountryPage = () => {
  const [country, setCountry] = useState({});
  const { countryName } = useParams();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const data = await countryAPI.getCountry(countryName);
        setCountry(data);
        console.log(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des informations du pays:", error);
        // Gestion des erreurs ici
      }
    };

    fetchCountry();
  }, [countryName]);

  return (
    <>
      <h1>Bienvenue sur la page {countryName}</h1>
      {/* Affichez les informations du pays ici en utilisant la variable d'état 'country' */}
    </>
  );
};

export default DetailCountryPage;
