import { AppBar, Box, InputBase, Toolbar, Typography } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import useStyles from "./styles";
import { Autocomplete } from "@react-google-maps/api";
import { useState } from "react";

const Header = ({ setCoordinate }) => {
  const [autoComplete, setAutoComplete] = useState(null);
  const classes = useStyles();

  const onLoad = (autoC) => setAutoComplete(autoC);

  const onPlaceChanged = () => {
    const lat = autoComplete.getPlace().geometry.location.lat();
    const lng = autoComplete.getPlace().geometry.location.lng();
    setCoordinate({lat, lng})
  }
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Travel Advisor
        </Typography>

        <Box display="flex">
          <Typography variant="h6">Explore new places</Typography>

          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
              </div>

              <InputBase
                placeholder="Search.."
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
