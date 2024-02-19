/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Box, Typography, Grid, useTheme } from "@mui/material";
import GlobalModalForProfile from "./GlobalModalForProfile";
import "../ProfilePage.css";

// import { CheckBox, Favorite } from "@mui/icons-material";
import { useAuthInfo } from "../../../helpers/AuthCheck";

const PersonalInfo = () => {
  const [globalModalForProfile, setGlobalModalForProfile] = useState(false);
  const btheme = useTheme();
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const [isGreen, setIsGreen] = useState(false);

  const [typeOfForm, setTypeOfForm] = useState("");
  const UserInfo = useAuthInfo();

  console.log(UserInfo);

  const tilesPersonal = [
    "Personal details",
    "About me",
    "Address history",
    //"Employment",
    "Income",
    // "Identity documents",
    "Emergency contact",
    "Tenant check (recommended)",
  ];

  useEffect(() => {
    if (UserInfo.personalInfo) {
      setIsGreen(true);
    }
  }, []);

  const handleTiles = (event) => {
    const tileClicked = event.target.textContent; // Get the text content of the button that was clicked

    console.log(`Tile clicked: ${tileClicked}`); // Log the clicked tile to the console for testing purposes

    setGlobalModalForProfile(!globalModalForProfile);
    setTypeOfForm(tileClicked);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // impot.meta. the form data or submit it to an API here
  // };

  return (
    <>
      <Box marginBlock={1}>
        <Typography variant="body1">
          <big> Personal </big>
        
        </Typography>
      {" "}
        <Typography variant="caption" >
        Details to help property managers validate who you are and assess your
          identity, employment and income.
        </Typography>
      </Box>

      {isGreen ? (
        <>
          <Typography marginTop={2}>
            You have succesfully Updated your renter profile.
          </Typography>
          <br/>
        </>
      ) : (
        <br />
      )}

      <Grid container spacing={2}>
        {tilesPersonal.map((tiles,index) => (
          <Grid item xs={12} sx={{ textAlign: "start" }} key={index}>
            <Box
              style={{
                width: "50%",
                paddingLeft: "2%",
                textTransform: "capitalize",
                // paddingRight: "60%",
                paddingBlock: "2%",
                borderRadius: "8px",
                backgroundColor: isGreen ? "green" : "",
                fontSize: "1rem",
                border: "1px solid",
                // boxShadow: btheme.palette.boxShadow,
                color: "white"
              }}
              variant={btheme.mixins}
              onClick={handleTiles}
            >
             {tiles} 
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* modal  */}
      <GlobalModalForProfile
        //propertyId={propertyId}
        open={globalModalForProfile}
        onClose={() => setGlobalModalForProfile(false)}
        typeOfForm={typeOfForm}
      />
    </>
  );
};

export default PersonalInfo;
