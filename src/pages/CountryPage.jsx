import React, { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import countryAPI from "../services/countryAPI";

const CountryPage = () => {
    const [countries, setCountries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")

    
    const fetchCountry = async () => {
        try {
            const data = await countryAPI.getAllCountries();
            setCountries(data);
            console.log(data)
        } catch (error) {
            // Gérer les erreurs, si nécessaire
        }
    };

    //pour la pagination
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const filteredCountries =  countries.filter(c => 
        c.name.common.toLowerCase().includes(search.toLowerCase())
    )

    const itemsPerPage = 12

    
    const paginatedCountries = Pagination.getData(filteredCountries, currentPage, itemsPerPage)
    
    // filtre
    const handleSearch = event => {
        const value = event.currentTarget.value
        setSearch(value)
        setCurrentPage(1)
    }

    useEffect(()=>{
        fetchCountry()
    },[countries])

    return (
        <div>
            <h1>Liste des pays</h1>
            <div>
                <input type="text" placeholder="Votre recherche..." onChange={handleSearch} value={search} />
            </div>
            <div className="contGrid">
                {paginatedCountries.map((country) => (
                    <div key={country.name.common} className="gridCountry">
                        <div className="flagGrid"><img src={country.flags.svg} alt="" /></div>
                        <strong>{country.name.common}</strong> - {country.capital}
                    </div>
                ))}
                {
                itemsPerPage < filteredCountries.length && 
                <Pagination 
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    length={countries.length}
                    onPageChanged={handlePageChange}
                />
            }
            </div>
        </div>
    );
};

export default CountryPage;