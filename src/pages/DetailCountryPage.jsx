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
        <div className="countryContenu">
          <div className="infoCC">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M0 128C0 92.7 28.7 64 64 64H256h48 16H576c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H320 304 256 64c-35.3 0-64-28.7-64-64V128zm320 0V384H576V128H320zM178.3 175.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1 .1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1h73.6l8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2L179 276H141l19-42.8zM448 164c11 0 20 9 20 20v4h44 16c11 0 20 9 20 20s-9 20-20 20h-2l-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45H448 376c-11 0-20-9-20-20s9-20 20-20h52v-4c0-11 9-20 20-20z"/></svg>
            <span className="label">Languages</span>
            <span>{country.languages ? Object.values(country.languages).join(', ') : ''}</span>
          </div>
          <div className="infoCC">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z"/></svg>
            <span className="label">Population</span>
            <span>{country.population ? country.population.toLocaleString() : ''}</span>
          </div>
          <div className="infoCC">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M176 288a112 112 0 1 0 0-224 112 112 0 1 0 0 224zM352 176c0 86.3-62.1 158.1-144 173.1V384h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H208v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V448H112c-17.7 0-32-14.3-32-32s14.3-32 32-32h32V349.1C62.1 334.1 0 262.3 0 176C0 78.8 78.8 0 176 0s176 78.8 176 176zM271.9 360.6c19.3-10.1 36.9-23.1 52.1-38.4c20 18.5 46.7 29.8 76.1 29.8c61.9 0 112-50.1 112-112s-50.1-112-112-112c-7.2 0-14.3 .7-21.1 2c-4.9-21.5-13-41.7-24-60.2C369.3 66 384.4 64 400 64c37 0 71.4 11.4 99.8 31l20.6-20.6L487 41c-6.9-6.9-8.9-17.2-5.2-26.2S494.3 0 504 0H616c13.3 0 24 10.7 24 24V136c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-33.4-33.4L545 140.2c19.5 28.4 31 62.7 31 99.8c0 97.2-78.8 176-176 176c-50.5 0-96-21.3-128.1-55.4z"/></svg>
            <span className="label">Demonyms</span>
            <span>{country.demonyms && country.demonyms.eng ? Object.values(country.demonyms.eng).join(' | ') : ''}</span>
          </div>
          <div className="infoCC">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M560 160A80 80 0 1 0 560 0a80 80 0 1 0 0 160zM55.9 512H381.1h75H578.9c33.8 0 61.1-27.4 61.1-61.1c0-11.2-3.1-22.2-8.9-31.8l-132-216.3C495 196.1 487.8 192 480 192s-15 4.1-19.1 10.7l-48.2 79L286.8 81c-6.6-10.6-18.3-17-30.8-17s-24.1 6.4-30.8 17L8.6 426.4C3 435.3 0 445.6 0 456.1C0 487 25 512 55.9 512z"/></svg>
            <span className="label">Area</span>
            <span>{country.area} kms</span>
          </div> 
          <div className="infoCC">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
            <span className="label">TimeZone</span>
            <span>{country.timezones}</span>
          </div>
        </div>
        {country.coatOfArms && country.coatOfArms.svg && (
          <div className="coatOfArms">
            <span>Coat Of Arms</span>
            <img src={country.coatOfArms.svg} />
          </div>
        )}

    </>
  );
};

export default DetailCountryPage;
