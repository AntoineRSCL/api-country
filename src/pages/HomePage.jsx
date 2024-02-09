import React, { useState, useEffect } from "react";
import countryAPI from "../services/countryAPI";
import { Link } from "react-router-dom";

const HomePage = (props) => {
    const [countries, setCountries] = useState([]);

    const fetchCountry = async () => {
        try {
            const data = await countryAPI.getRandomCountry();
            setCountries(data)
        }catch(error)
        {
            //Gerer les erreurs
        }
    }

    useEffect(() => {
        fetchCountry()
    },[])

    return ( 
        <>
            <div>
                <div className="presentation">
                    <h1>Welcome on APICountry</h1>
                    <p>Explore the world with us! Discover fascinating insights and in-depth information about countries around the globe on our platform dedicated to sharing insights about nations.</p>
                    <h2>3 randoms countries : </h2>
                </div>
                <div className="homeCountries">
                    {countries.map((country) => (
                        <div className="homeCountry" 
                        key={country.name.common}>
                            <div className="flagHC" style={{ backgroundImage: `url(${country.flags.svg})` }}></div>
                            <h2>{country.name.common}</h2>
                            <h4>{country.capital}</h4>
                            <div className="btnHC">
                                <Link to={'/country'} className="btnCountry">
                                    <div >See All Countries</div>  
                                </Link>
                                <Link to={`/country/${country.name.common}`} className="btnDetailCountry">
                                    <div ><span>See {country.name.common} Infos</span></div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
     );
}
 
export default HomePage;