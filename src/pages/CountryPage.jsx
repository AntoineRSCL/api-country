import React, { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import countryAPI from "../services/countryAPI";
import World from "@svg-maps/world";
import { SVGMap } from "react-svg-map";
import { Link } from "react-router-dom";
//import "react-svg-map/lib/index.css";

const CountryPage = () => {
    const [countries, setCountries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    //recupere les donnees et trie par ordre alphabetique
    const fetchCountry = async () => {
        try {
            const data = await countryAPI.getAllCountries();
            data.sort(function(a,b) {
                var nameA = a.name.common
                var nameB = b.name.common
                if(nameA < nameB){
                    return -1;
                }
                if(nameA > nameB){
                    return 1;
                }
                return 0;
            })
            setCountries(data);
        } catch (error) {
            console.error(error)
        }
    };

    const handlePageChange = (page) => {
        //Limite que la page reste dans les limites
        const newPage = Math.max(1, Math.min(page, 21));
        setCurrentPage(newPage);
    };

    //On applique des filtres pour la recherche
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
                <h1 className="h1Annonce">List of Countries</h1>
                <div className="containerSVG">
                    <SVGMap onLocationClick={(e)=>{
                        let name = e.target.ariaLabel
                        setSearch(name)
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
                            <Link key={country.name.common} to={`/country/${country.name.common}`}>
                                <div
                                    key={country.name.common}
                                    className="gridCountry"
                                >   
                                    <div className="contenairDrapeau">
                                        <div className="flagGrid" style={{ backgroundImage: `url(${country.flags.svg})` }}></div> 
                                    </div>
                                    <div className="infoCountry">{country.name.common}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            {itemsPerPage < filteredCountries.length && (
                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    length={filteredCountries.length}
                    onPageChanged={handlePageChange}
                />
            )}
        </>
    );
};

export default CountryPage;
