import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import countryAPI from "../services/countryAPI";

const DetailCountryPage = () => {
  const [country, setCountry] = useState({});
  const { countryName } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchCountry();
  }, []);

  return (
    <>
        <div className="flagInfoCountry">
          <div className="flagCountry" style={{ backgroundImage: `url(${country.flags && country.flags.svg})` }}></div>
          <div className="infosCountry">
            <h2><span>Official Name : </span>{country.name && country.name.official}</h2>
            <h2><span>Name : </span> {country.name && country.name.common}</h2>
            <h3><span>Capital : </span> {country.capital}</h3>
            <h4><span>Region : </span>{country.region} / {country.subregion}</h4>
          </div>
        </div>
    </>
  );
};

export default DetailCountryPage;
