import {useState, useEffect} from 'react';
import axios from 'axios'
import Country from "./components/Country.jsx";
import SearchResult from "./components/SearchResult.jsx";


const App = () => {

    const [countries, setCountries] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [resultCountries, setResultCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);


    useEffect(() => {
        console.log('effect run')

        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
            .then(response => {
                setCountries(response.data);
            })
            .catch(error => {
                console.error("Error fetching countries:", error);
            });
    }, []);


    const handleSearchChange = (event) => {
        setSearchString(event.target.value);
        searchCountry(event.target.value);
    };

    const handleShowCountry = (country) => {
        setSelectedCountry(country);
        setResultCountries([]);
        setSearchString('');
    };


    const searchCountry = (str) => {
        setSelectedCountry(null);

        setResultCountries(
            countries.filter(country =>
                country.name.common.toLowerCase().includes(str.toLowerCase()) || country.name.official.toLowerCase().includes(str.toLowerCase())
            )
        );
    };


    return (
        <div>
            <div>
                Find countries: <input value={searchString} onChange={handleSearchChange}/>
            </div>

            {selectedCountry ? (
                <Country {...selectedCountry} />
            ) : (
                <SearchResult searches={resultCountries} onClick={handleShowCountry}/>
            )}
        </div>
    )
}

export default App