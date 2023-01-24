 import { useState, useEffect, ChangeEvent } from "react"
 
 import { optionType, forecastType } from "../types"
 
 const BASE_URL = 'http://api.openweathermap.org'

 const useForecast = () => {
 const [term, setTerm] = useState<string>('')
 const [options, setOptions] = useState<[]>([])
const [city, setCity] = useState<optionType | null >(null)
const [forecast, setForecast] = useState<forecastType | null>(null)

 const getSearchOptions = async (term: string) => {
  fetch(`${BASE_URL}/geo/1.0/direct?q=${term.trim()}&limit=5&appid=${process.env.REACT_APP_API_KEY}`)
 .then((res)=>res.json())
 .then((data) => setOptions(data))
 .catch((ev) => console.log({ ev }))
}
 
const onInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
  const value = ev.target.value.trim();
  setTerm(ev.target.value);

  if(value !== '') {
    getSearchOptions(value)
  }
  
  
 }

 const getForecast = (data: optionType) => {
fetch(`${BASE_URL}/data/2.5/weather?q=${data.lat}&lon=${data.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
.then((res)=>res.json())
.then((data) => setForecast((data)))

 }

 const onSubmit = () => {
if(!city)  return
getForecast(city)


 }

 const onOptionSelect = (option: optionType) => {
  setCity(option)
 }



 useEffect(() => {
  if(city) {
    setTerm(city.name)
    setOptions([])
  }

 }, [city])

 return {
  forecast,
  options,
  term,
  onOptionSelect,
  onSubmit,
  onInputChange,
}

}

export default useForecast