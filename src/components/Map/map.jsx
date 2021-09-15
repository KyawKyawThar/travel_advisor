import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import GoogleMapReact from "google-map-react";

import useStyles from "./styles";
import { LocationOnSharp } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import mapStyles from "./mapStyles";
import { InfoWindow } from "@react-google-maps/api";

const Maps = ({
  coordinate,
  setCoordinate,
  setBounds,
  places,
  setChildClicked,
  weatherData,
}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width: 600px)");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinate}
        center={coordinate}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          // console.log("hht", e);
          setCoordinate({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={place.latitude}
            lng={place.longitude}
            key={i}
          >
            {!isDesktop ? (
              <LocationOnSharp color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography gutterBottom variant="subtitle2">
                  {place.name}
                </Typography>

                <img
                  className={classes.pointer}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https:www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                  alt={place.name}
                />

                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}

        {weatherData?.list?.length &&
          weatherData.list?.map((data, i) => (
            <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
              <img
                src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                alt="weather img"
                height={120}
              />
            </div>
          ))}
      </GoogleMapReact>

      <></>
    </div>
  );
};

export default Maps;

//Adding infoWindows
// Now we move on to adding clickable InfoWindows that will show your users additional information. To make this work, you will need an onSelect method in the markers component to show the details of the particular item that was clicked and use the marker’s onCloseClick to close the InfoWindow when the user clicks on the x button. You will also need to store the selected location in the component’s state. Make sure to import the InfoWindow component in the document.
//export const MapContainer = () => {
//   const [ selected, setSelected ] = useState({});
//
//   const onSelect = item => {
//     setSelected(item);
//   }
//   ...
//     return (
//     ...
//          {
//             locations.map(item => {
//               return (
//               <Marker key={item.name}
//                 position={item.location}
//                 onClick={() => onSelect(item)}
//               />
//               )
//             })
//          }
//         {
//             selected.location &&
//             (
//               <InfoWindow
//               position={selected.location}
//               clickable={true}
//               onCloseClick={() => setSelected({})}
//             >
//               <p>{selected.name}</p>
//             </InfoWindow>
//             )
//          }
//      </GoogleMap>
//     )
// }
