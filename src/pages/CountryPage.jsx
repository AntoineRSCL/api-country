import React, { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import countryAPI from "../services/countryAPI";
import World from "@svg-maps/world";
import { SVGMap } from "react-svg-map";
//import "react-svg-map/lib/index.css";

const CountryPage = () => {
    const [countries, setCountries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [compteur, setCompteur] = useState(0)
    //const [hoveredCountry, setHoveredCountry] = useState("");

    const fetchCountry = async () => {
        try {
            const data = await countryAPI.getAllCountries();
            setCountries(data);
            //console.log(data)
        } catch (error) {
            // Gérer les erreurs, si nécessaire
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredCountries = countries.filter(c =>
        c.name.common.toLowerCase().includes(search.toLowerCase()) ||
        c.name.official.toLowerCase().includes(search.toLowerCase())
    );

    const itemsPerPage = 12;

    const paginatedCountries = Pagination.getData(
        filteredCountries,
        currentPage,
        itemsPerPage
    );

    const handleSearch = (event) => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    };


    useEffect(() => {
        fetchCountry();
    }, [countries]);

    return (
        <>
            <div>
                <h1>Liste des pays</h1>
                <div className="containerSVG">
                    <SVGMap onLocationClick={(e)=>{
                        if(compteur === 1){
                            setCompteur(0)
                        }
                        let name = e.target.ariaLabel
                        setSearch(name)
                        setCompteur(1)
                    }} className="svg-map" map={World} />
                </div>
                <div className="inputDiv">
                    <input
                        type="text"
                        placeholder="Votre recherche..."
                        onChange={handleSearch}
                        value={search}
                    />
                </div>
                <div className="contenair">
                    <div className="contGrid">
                        {paginatedCountries.map((country) => (
                            <div
                                key={country.name.common}
                                className="gridCountry"
                            >   
                                <div className="contenairDrapeau">
                                    <div className="flagGrid" style={{ backgroundImage: `url(${country.flags.svg})` }}></div> 
                                </div>
                                <div className="infoCountry">{country.name.common}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {itemsPerPage < filteredCountries.length && (
                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    length={countries.length}
                    onPageChanged={handlePageChange}
                />
            )}
        </>
    );
};

export default CountryPage;
