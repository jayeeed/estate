import { useState, useEffect } from "react";
import AdminLayout from "../../../layouts/adminLayout";
import {
  Box,
  Typography,
  Grid,
  MenuItem,
  Select,
  Checkbox,
  TextField,
  Button,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const AirbnbHostSettings = () => {
  const [hostCost, setHostCost] = useState(0);
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("global");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedTimeZone, setSelectedTimeZone] = useState("UTC");
  const [currentSettings, setCurrentSettings] = useState({
    selectedRegion: selectedRegion, // Initialize selectedRegion in currentSettings
  });

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);

    // Reset currency and time zone when region changes
    setSelectedCurrency("USD");
    setSelectedTimeZone("UTC");

    // Update currentSettings with the selected region
    setCurrentSettings((prevSettings) => ({
      ...prevSettings,
      selectedRegion: region,
    }));
  };

  // const handleRegionChange = (e) => {
  //   const region = e.target.value;
  //   setSelectedRegion(region);

  //   // Reset currency and time zone when region changes
  //   setSelectedCurrency("USD");
  //   setSelectedTimeZone("UTC");
  // };

  useEffect(() => {
    // Fetch settings when any of the filter options change
    fetchSettings();
  }, [
    hostCost,
    subscriptionActive,
    selectedRegion,
    selectedCurrency,
    selectedTimeZone,
  ]);

  const fetchSettings = async () => {
    // Simulate fetching settings from the server based on the selected region
    // You can replace this with actual API calls to get region-specific data
    const regionSettings = getRegionSpecificSettings(selectedRegion);

    // Update the currentSettings state with fetched settings
    setCurrentSettings({
      hostCost,
      subscriptionActive,
      selectedCurrency,
      selectedRegion,
      selectedTimeZone,
      ...regionSettings,
    });
  };

  const getRegionSpecificSettings = (region) => {
    switch (region) {
      case "australia":
        return {
          availableCurrencies: ["AUD", "NZD"],
          availableTimeZones: ["Australia/Sydney", "Australia/Melbourne"],
        };
      default:
        // Global settings
        return {
          availableCurrencies: ["USD", "EUR"],
          availableTimeZones: ["UTC", "GMT"],
        };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission, e.g., send data to an API
    console.log("Form submitted with data:", {
      hostCost,
      subscriptionActive,
      selectedRegion,
      selectedCurrency,
      selectedTimeZone,
    });
    // Optionally, display a success message or handle errors
  };

  return (
    <>
      <AdminLayout title={"Hosting Cost Setup"}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex" }}>
            {/* Sidebar */}
            <Box sx={{ width: "300px", flexShrink: 0, p: 3 }}>
              <Typography variant="h3" marginBottom={5}>
                Estate Host Settings
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Host Cost per Property"
                    type="number"
                    value={hostCost}
                    variant="outlined"
                    onChange={(e) => setHostCost(parseFloat(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Checkbox
                    checked={subscriptionActive}
                    onChange={() => setSubscriptionActive(!subscriptionActive)}
                  />
                  <Typography variant="caption">
                    Activate Subscription
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">Select Region:</Typography>
                  <Select value={selectedRegion} onChange={handleRegionChange}>
                    <MenuItem value="global"> Global </MenuItem>
                    <MenuItem value="australia"> Australia </MenuItem>
                    {/* Add more regions as needed */}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">Select Currency:</Typography>

                  <Select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                  >
                    {(currentSettings?.availableCurrencies || []).map(
                      (currency) => (
                        <MenuItem
                          key={currency}
                          value={currency}
                          sx={{ whiteSpace: "pre" }}
                        >
                          &nbsp;{currency}&nbsp;
                        </MenuItem>
                      )
                    )}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">Select Time Zone:</Typography>
                  <Select
                    value={selectedTimeZone}
                    onChange={(e) => setSelectedTimeZone(e.target.value)}
                  >
                    {(currentSettings?.availableTimeZones || []).map(
                      (timeZone) => (
                        <MenuItem
                          key={timeZone}
                          value={timeZone}
                          sx={{ whiteSpace: "pre" }}
                        >
                          &nbsp;{timeZone}&nbsp;
                        </MenuItem>
                      )
                    )}
                  </Select>
                </Grid>
              </Grid>
            </Box>
            {/* Main Content */}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: "background.default",
                p: 3,
                borderRadius: "12px",
              }}
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="current settings">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2}>
                        <Typography variant="h6">Current Settings</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Region/Country:
                      </TableCell>
                      <TableCell>{currentSettings?.selectedRegion}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                        Host Cost:
                      </TableCell>
                      <TableCell>{currentSettings?.hostCost}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Subscription Active:
                      </TableCell>
                      <TableCell>
                        {currentSettings?.subscriptionActive ? "Yes" : "No"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Currency:
                      </TableCell>
                      <TableCell>{currentSettings?.selectedCurrency}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Time Zone:
                      </TableCell>
                      <TableCell>{currentSettings?.selectedTimeZone}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <Box sx={{ p: 3 }}>
                <h3>Current Settings:</h3>
                <p style={{ margin: "8px 0" }}>
                  Host Cost: {currentSettings?.hostCost}
                </p>
                <p style={{ margin: "8px 0" }}>
                  Subscription Active:{" "}
                  {currentSettings?.subscriptionActive ? "Yes" : "No"}
                </p>
                <p style={{ margin: "8px 0" }}>
                  Currency: {currentSettings?.selectedCurrency}
                </p>
                <p style={{ margin: "8px 0" }}>
                  Time Zone: {currentSettings?.selectedTimeZone}
                </p>
              </Box> */}
            </Box>
          </Box>
          <Box textAlign={"right"}>
            <br />

            <Button variant="contained" type="submit">
              Fix this rule
            </Button>
          </Box>
        </form>
      </AdminLayout>
    </>
  );
};

export default AirbnbHostSettings;
