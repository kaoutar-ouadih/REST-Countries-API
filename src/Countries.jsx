import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"


const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [filtredCountries, setFiltredCountries] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [region, setRegion] = useState('');


    useEffect(()=> {fetch('https://restcountries.com/v3.1/all')
            .then(res=> res.json())
            .then(data=> {console.log(data)
                setCountries(data);
                setFiltredCountries(data);
            }
            )
            .catch(error=> console.log('error', error))
    },[])

    useEffect(()=>{
        findCountryAndFilter(searchKeyword, region);
    },[region, searchKeyword])

    function findCountryAndFilter(name, reg){
        if( region && searchKeyword == ''){
            console.log('region', region);
            let result = countries.filter((item)=> item.region.toLowerCase() === reg.toLowerCase() );
            setFiltredCountries(result);
        }else if(region == '' && searchKeyword){
            console.log('searchKeyword', searchKeyword);
            let result = countries.filter((item)=> item.name.official.toLowerCase().includes(name.toLowerCase()));
            setFiltredCountries(result);
        }else if( region && searchKeyword){
            console.log('region and searchKeyword', region, searchKeyword);
            let result = countries.filter((item)=> item.name.official.toLowerCase().includes(name.toLowerCase()) && item.region.toLowerCase() === reg.toLowerCase());
                setFiltredCountries(result);
        }
    }

  return (
    <div className="bg-white text-veryDarkBlueText dark:bg-veryDarkBlueBackground px-10 py-12 min-h-screen">
      <div className="flex-col gap-y-12 flex md:flex-row justify-between mb-12">
        <div className="relative">
            <input 
                type="search" 
                placeholder="Search for a country..." 
                value={searchKeyword}
                onChange={(e)=> {
                    setSearchKeyword(e.target.value);
                }}
                className="bg-white dark:bg-darkBlue py-3 px-16 rounded-md shadow-md text-veryDarkBlueText dark:text-white text-sm w-[450px]" />
            <svg className="absolute top-3 left-6" xmlns="http://www.w3.org/2000/svg" height="17" width="17" viewBox="0 0 512 512"><path className="dark:fill-[#f8f9fc]" fill="gray" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
        </div>
        <select value={region}  name="regionSelect" id="regionSelect" onChange={(e)=> {setRegion(e.target.value); 
                                                                                       }} className="w-[180px] rounded-md shadow-lg bg-white dark:bg-darkBlue text-veryDarkBlueText dark:text-white text-sm py-3 px-3">
            <option value="">Filter by Region</option>
            <option value="africa">Africa</option>
            <option value="americas">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
        </select>
      </div>
      <div className="flex justify-center flex-wrap gap-[48px] sm:justify-between">
        {filtredCountries && 
            filtredCountries.map(item=>(
                <Link key={item.name.official} to={`/country/${item.name.official}`} className="min-w-[250px] basis-[360px] sm:basis-[250px]">
                    <div  className="text-white  rounded-md shadow-lg overflow-hidden">
                        <img src={item.flags.png} alt="country flag" className="h-40 w-full" />
                        <div className="p-3 px-5 bg-white text-veryDarkBlueText dark:text-white dark:bg-darkBlue h-[180px]">
                            <h2 className="font-semibold my-3">{item.name.official}</h2>
                            <span className="block text-sm mb-1 "><span className="font-semibold">Population: </span> {item.population}</span>
                            <span className="block text-sm mb-1"><span className="font-semibold">Region: </span>{item.region}</span>
                            <span className="block text-sm mb-1"><span className="font-semibold">Capital: </span>{item.capital}</span>
                        </div>
                    </div>
                </Link>
            ))}
      </div>
    </div>
  )
}

export default Countries
