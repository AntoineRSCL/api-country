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
                <h1 className="h1Annonce">Welcome on APICountry</h1>
                <h4>3 randoms countries : </h4>
                <div className="homeCountries">
                    {countries.map((country) => (
                        <Link key={country.name.common} to={`/country/${country.name.common}`}>
                            <div className="homeCountry">

                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
     );
}
 
export default HomePage;