import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const Country = () => {
  const {id} = useParams();
  const [countryData, setCountryData] = useState({});

  useEffect(()=>{
    fetch(`https://restcountries.com/v3.1/name/${id}`)
    .then(res=> res.json())
    .then(data => {
                  setCountryData(data[0]);
                  console.log(data[0]);
                })
    .catch((error)=> console.log(error))
  }, [])


  return (
    <div className="bg-white dark:bg-veryDarkBlueBackground min-h-screen px-10 py-12">
      <Link aria-labelledby="go-back-btn" to="/" className="w-28 bg-white dark:bg-darkBlue flex gap-2 items-center py-2 px-6 rounded-md shadow-lg text-veryDarkBlueText dark:text-white text-sm mb-12">
         <svg xmlns="http://www.w3.org/2000/svg" height="17" width="15" viewBox="0 0 448 512"><path className="dark:fill-white" fill="black" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
         <span id="go-back-btn">back</span>
      </Link>
      {countryData && 
      <div className="text-veryDarkBlueText dark:text-white flex-col flex gap-6 lg:gap-24 lg:flex-row">
        <img src={countryData.flags?.png} alt="country flag" className="flex-1 w-full h-[310px]" />
        <div className="flex-1">
            <span className="font-bold text-xl my-6 block">{countryData.name?.official}</span>
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                    <span className="block mb-1 font-semibold">Native Name: <span className="font-normal text-sm">{countryData.name?.official}</span></span>
                    <span className="block mb-1 font-semibold">Population:  <span className="font-normal text-sm">{countryData.population}</span></span>
                    <span className="block mb-1 font-semibold">Region: <span className="font-normal text-sm">{countryData.region}</span></span>
                    <span className="block mb-1 font-semibold">Sub Region: <span className="font-normal text-sm">{countryData.subregion}</span></span>
                    <span className="block mb-1 font-semibold">Capital: <span className="font-normal text-sm">{countryData.capital?.[0]}</span></span>
                </div>
                <div className="flex-1">
                    <span className="block mb-1 font-semibold">Top Level Domain: <span className="font-normal text-sm">{countryData.tld?.[0]}</span></span>
                    <span className="block mb-1 font-semibold">Currencies: <span className="font-normal text-sm">{countryData.currencies &&
                            Object.values(countryData.currencies)
                            .map((currency) => currency.name)
                            .join(", ")}</span>
                    </span>
                    <span className="block mb-1 font-semibold">Languages: 
                        <span className="font-normal text-sm">
                        {countryData.languages &&
                            Object.values(countryData.languages).join(", ")}
                        </span>
                    </span>
                </div>
            </div>
            <div className="flex gap-1 items-center mt-12">
                <span className="mb-1 font-semibold">Border Countries: </span>
                <span className="flex gap-2">
                    {countryData.borders?.length > 0 ? (
                        countryData.borders.map((border) => (
                        <span  key={border} className="bg-white text-veryDarkBlueText dark:text-white dark:bg-darkBlue py-1 px-3 rounded-sm shadow-lg border border-gray-200 dark:border-none text-sm inline-block">{border} </span>
                        ))
                    ) : (
                        <span className="bg-white text-veryDarkBlueText dark:text-white dark:bg-darkBlue py-1 px-3 rounded-sm shadow-lg border border-gray-200 dark:border-none text-sm inline-block mx-2">None</span>
                    )}
                </span>
            </div>
        </div> 
      </div>}
    </div>
  )
}

export default Country
