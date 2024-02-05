import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import countryAPI from "../services/countryAPI";

const DetailCountryPage = () => {
  const [country, setCountry] = useState({});
  const { countryName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const data = await countryAPI.getCountry(countryName);
        
        // Filtrer les résultats pour ne conserver que celui dont le nom correspond exactement à countryName
        const filteredCountry = data.find(item => item.name.common === countryName);
        
        // Si aucun résultat correspondant, rediriger vers la page principale
        if (!filteredCountry) {
          throw new Error("Aucun résultat correspondant au nom du pays.");
        }

        setCountry(filteredCountry);
        console.log(filteredCountry);
      } catch (error) {
         // Gestion des erreurs ici
         console.error("Erreur lors de la récupération des données du pays:", error);
         // Redirection vers la page principale
         navigate("/country", { replace: true });
      }
    };

    fetchCountry();
  }, [countryName, navigate]);

  return (
    <>
      <h1>Bienvenue sur la page {countryName}</h1>
      {/* Affichez les informations du pays ici en utilisant la variable d'état 'country' */}
    </>
  );
};

export default DetailCountryPage;
