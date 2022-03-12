import React from 'react';
import { useState } from 'react';


const api = {

  key: "97234666b1b2c4abb0ebfc42092a622e",
  base_url: "http://api.openweathermap.org/data/2.5/"
}

function App() {
  const[query, setQuery] = useState('');
  const[weather, setWeather] = useState({});

  const search = e =>{
    if (e.key === "Enter"){
      console.log("enter")
      fetch(`${api.base_url}weather?q=${query}&units=metric&APPID=${api.key}`).then(resp => resp.json()).then(result => {
        setQuery('');
        setWeather(result)
        console.log(result)
        }
      )
    }
  } 

  const dateBuilder = (d)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sun", "Mond", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
    
    return `${day} ${date} ${month} ${year}`  
  }
  const changeBackground = () =>{
    let class_name;
    if(typeof weather.main != 'undefined'){
      if(weather.main.temp > 16) {
        if(weather.weather[0].main === 'Clouds'){
          class_name = 'app cloudy';
        }else{
          class_name = 'app warm';
        }
      }else {
        if(weather.weather[0].main === 'Clouds'){
          class_name = 'app cloudy';
        }else{
          class_name = 'app cold';
        }
      }
    }else{
      class_name = 'app';
    }

    return class_name
  };
  const class_name = changeBackground()
  return (
    
    <div className={class_name}>
      <main>
        <div className="search-box">
          <input 
          type="text"
          className = "search-bar"
          placeholder="Search ... "
          onChange={e => setQuery(e.target.value)}
          value = {query}
          onKeyPress = {search}
          />
        </div>
        {(typeof weather.main != "undefined") ? 
        (<>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">{`${Math.round(weather.main.temp)}°c`}</div>
            <div className="weather">{`${weather.weather[0].main}`}</div>
          </div>
        </>)
        : ('')
        }
      </main>
    </div>
  )
}

export default App;
