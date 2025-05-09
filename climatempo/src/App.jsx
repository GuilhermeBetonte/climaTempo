import { useState } from "react";
import React from "react";
import { Snackbar, Alert, Button } from "@mui/material";

const App = () => {
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [textError, setTextError] = useState("");
  const [valueCity, setValueCity] = useState("");
  const [wind, setWind] = useState("");
  const [humidity, setHumidity] = useState("");
  const [temp, setTemp] = useState("");
  const [nameCity, setNameCity] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [countryIcon, setCountryIcon] = useState("");
  //const [backgroundUrl, setBackgroundUrl] = useState("");
  const [backgroundUrl, setBackgroundUrl] = useState("/img/earth.jpg");
  const apiKey = import.meta.env.VITE_API_KEY;

  const handleChange = (event) => {
    setValueCity(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const getWeatherData = async (city) => {
    try {
      const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
      const res = await fetch(apiWeatherURL);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      setOpen(true);
      setTextError("Erro ao encontrar a cidade.");
    }
  };

  const showWeatherData = async (city) => {
    setVisible(false);

    if (city === "") {
      setOpen(true);
      setTextError("Digite alguma cidade.");
      setBackgroundUrl(`/public/img/earth.jpg`);
      return;
    }

    setIsLoading(true);

    const data = await getWeatherData(city);

    setIsLoading(false);
    if (!data || data.cod === "404") {
      setOpen(true);
      setTextError("Cidade não encontrada!");
      setBackgroundUrl(`/img/earth.jpg`);
      return;
    }

    setWeatherIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    setCountryIcon(`https://flagcdn.com/w80/${data.sys.country.toLowerCase()}.png`);
    setWind(`${data.wind.speed} km/h`);
    setHumidity(`${data.main.humidity}%`);
    setTemp(`${parseInt(data.main.temp)} °C`);
    setNameCity(`${data.name}`);
    setVisible(true);

    try {
      const unsplashKey = import.meta.env.VITE_UNSPLASH_KEY;
      const unsplashUrl = `https://api.unsplash.com/search/photos?page=1&query=${city}&client_id=${unsplashKey}`;
      const response = await fetch(unsplashUrl);
      const unsplashData = await response.json();

      if (unsplashData.results.length > 0) {
        setBackgroundUrl(unsplashData.results[0].urls.full);
      } else {
        setBackgroundUrl("");
      }
    } catch (error) {
      console.log("Erro ao buscar imagem no Unsplash", error);
    }
  };

  const eventEnter = (event) => {
    if (event.code === "Enter") {
      const city = event.target.value;
      showWeatherData(city);
    }
  };

  return (
    <>
      <div
        className="w-full min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat p-4"
        style={{
          backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : "",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 0.5s ease-in-out",
        }}
      >
        <div className="w-full max-w-md bg-gray-300 bg-opacity-50 rounded-2xl p-6 shadow-lg"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)' // Branco com 70% de opacidade
          }}>
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Confira o clima de uma cidade:
          </h2>

          <div className="flex flex-col sm:flex-row gap-2 mb-6">
            <input
              onChange={handleChange}
              onKeyUp={eventEnter}
              className="flex-grow px-4 py-2 text-gray-800 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Digite o nome da cidade"
              id="city-input"
            />
            <button
              id="search"
              onClick={() => showWeatherData(valueCity)}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 transition min-w-[40px] flex justify-center items-center"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {isVisible && !isLoading && (
            <div className="space-y-4">
              <div className="flex justify-center items-center gap-2">
                <i className="fa-solid fa-location-dot text-blue-500"></i>
                <h2 className="text-xl font-medium text-gray-800">{nameCity}</h2>
                <img className="w-6 h-4 object-cover" src={countryIcon} alt="Bandeira do país" />
              </div>

              <div className="text-center">
                <p className="text-5xl font-bold text-gray-800 my-2">{temp}</p>
              </div>

              <div className="flex justify-center items-center gap-2">
                <img src={weatherIcon} alt="Condições do tempo" className="w-12" />
              </div>

              <div className="flex justify-around mt-6">
                <div className="text-center">
                  <i className="fa-solid fa-droplet text-blue-500 text-xl"></i>
                  <p className="text-gray-700 mt-1">{humidity}</p>
                  <p className="text-sm text-gray-500">Umidade</p>
                </div>

                <div className="text-center">
                  <i className="fa-solid fa-wind text-blue-500 text-xl"></i>
                  <p className="text-gray-700 mt-1">{wind}</p>
                  <p className="text-sm text-gray-500">Vento</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {textError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default App;