import Header from "./components/Header/header.jsx";
import { CssBaseline, Grid } from "@material-ui/core";
import Lists from "./components/List/list";

import Maps from "./components/Map/map";
import { useEffect, useState } from "react";
import { getPlaceData, getWeatherData } from "./components/Api";

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlace] = useState([]);
  const [places, setPlaces] = useState([]);
  const [coordinate, setCoordinate] = useState({});
  const [bounds, setBounds] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinate({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filteredPlace = places.filter((place) => place.rating > rating);
    setFilteredPlace(filteredPlace);
  }, [rating]);

  useEffect(() => {
    // console.log(coordinate, bounds);
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

      getWeatherData(coordinate.lat, coordinate.lng).then((data) => {
        console.log("weather data", data);
        setWeatherData(data);
      });
      getPlaceData(type, bounds.sw, bounds.ne).then((data) => {
        console.log({ data });
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlace([]);
        setIsLoading(false);
      });
    }
  }, [type, bounds]);
  return (
    <>
      <CssBaseline />
      <Header setCoordinate={setCoordinate} />

      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <Lists
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Maps
            coordinate={coordinate}
            setCoordinate={setCoordinate}
            setBounds={setBounds}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
