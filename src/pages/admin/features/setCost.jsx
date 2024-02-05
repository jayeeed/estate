import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
// Select
// Menu
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { MenuItem, Select, FormControl, InputLabel,Input } from "@mui/material";

const AirbnbAdminComponent = () => {
  const [propertyCost, setPropertyCost] = useState(0);
  const [subscriptionActivated, setSubscriptionActivated] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const drawerWidth = 240;

  const handlePropertyCostChange = (event) => {
    setPropertyCost(Number(event.target.value));
  };

  const handleSubscriptionToggle = () => {
    setSubscriptionActivated((prevValue) => !prevValue);
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleFeatureToggle = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures((prevFeatures) =>
        prevFeatures.filter((selectedFeature) => selectedFeature !== feature)
      );
    } else {
      setSelectedFeatures((prevFeatures) => [...prevFeatures, feature]);
    }
  };

  // Simulating fetching and displaying results based on filters
  const filteredResults = () => {
    // In a real application, you would fetch results from a backend or Airbnb's APIs.
    console.log("Fetching results with filters:");
    console.log("Region:", selectedRegion);
    console.log("Currency:", selectedCurrency);
    console.log("Property Cost:", propertyCost);
    console.log("Subscription Activated:", subscriptionActivated);
    console.log("Selected Features:", selectedFeatures);
    // Implement logic to fetch and display results dynamically.
  };

  // Call filteredResults whenever any filter changes
  React.useEffect(() => {
    filteredResults();
  }, [
    selectedRegion,
    selectedCurrency,
    propertyCost,
    subscriptionActivated,
    selectedFeatures,
  ]);
  
    const handleTimeZoneChange = (event) => {
      // Handle changes to TimeZone
      // You can use the selected value to update the TimeZone settings
      console.log('Selected TimeZone:', event.target.value);
    };
  
    return (
      <Box sx={{ display: 'flex' }}>
        {/* ... (previous code) */}
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
            <div className="sidebar">
              <h2>Filter Sidebar</h2>
              <div>
                <label htmlFor="region">Region:</label>
                <Select
                  id="region"
                  value={selectedRegion}
                  onChange={handleRegionChange}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="North America">North America</MenuItem>
                  <MenuItem value="Europe">Europe</MenuItem>
                </Select>
              </div>
              <div>
                <label htmlFor="country">Country:</label>
                <Select
                  id="country"
                  value={selectedCountry}
                  onChange={(event) => setSelectedCountry(event.target.value)}
                >
                  {/* Add country options based on the selected region */}
                  {selectedRegion === 'All' ? (
                    <>
                      <MenuItem value="USA">United States</MenuItem>
                      <MenuItem value="CAN">Canada</MenuItem>
                      <MenuItem value="EUR">Europe Country 1</MenuItem>
                      <MenuItem value="EUR">Europe Country 2</MenuItem>
                      {/* Add more country options */}
                    </>
                  ) : selectedRegion === 'North America' ? (
                    <>
                      <MenuItem value="USA">United States</MenuItem>
                      <MenuItem value="CAN">Canada</MenuItem>
                      {/* Add more North America country options if needed */}
                    </>
                  ) : selectedRegion === 'Europe' ? (
                    <>
                      <MenuItem value="EUR">Europe Country 1</MenuItem>
                      <MenuItem value="EUR">Europe Country 2</MenuItem>
                      {/* Add more Europe country options if needed */}
                    </>
                  ) : null}
                </Select>
              </div>
              <div>
                <label htmlFor="currency">Currency:</label>
                <Select
                  id="currency"
                  value={selectedCurrency}
                  onChange={handleCurrencyChange}
                >
                  {selectedCountry === 'USA' ? (
                    <>
                      <MenuItem value="USD">USD</MenuItem>
                      <MenuItem value="CAD">CAD</MenuItem>
                    </>
                  ) : selectedCountry === 'CAN' ? (
                    <>
                      <MenuItem value="CAD">CAD</MenuItem>
                      <MenuItem value="USD">USD</MenuItem>
                    </>
                  ) : selectedCountry === 'EUR' ? (
                    <>
                      <MenuItem value="EUR">EUR</MenuItem>
                      {/* Add more currency options for Europe countries if needed */}
                    </>
                  ) : null}
                </Select>
              </div>
              <div>
                <label htmlFor="timeZone">Time Zone:</label>
                <Select
                  id="timeZone"
                  value={selectedTimeZone}
                  onChange={handleTimeZoneChange}
                >
                  {selectedCountry === 'USA' ? (
                    <>
                      <MenuItem value="America/New_York">Eastern Time (ET)</MenuItem>
                      <MenuItem value="America/Chicago">Central Time (CT)</MenuItem>
                      {/* Add more time zone options for the USA if needed */}
                    </>
                  ) : selectedCountry === 'CAN' ? (
                    <>
                      <MenuItem value="America/Toronto">Eastern Time (ET)</MenuItem>
                      <MenuItem value="America/Vancouver">Pacific Time (PT)</MenuItem>
                      {/* Add more time zone options for Canada if needed */}
                    </>
                  ) : selectedCountry === 'EUR' ? (
                    <>
                      <MenuItem value="Europe/Berlin">Central European Time (CET)</MenuItem>
                      <MenuItem value="Europe/Paris">Central European Time (CET)</MenuItem>
                      {/* Add more time zone options for Europe countries if needed */}
                    </>
                  ) : null}
                </Select>
              </div>
              {/* ... (previous code) */}
            </div>
          </List>
          {/* ... (previous code) */}
        </Drawer>
        {/* ... (previous code) */}
      </Box>
    );
  };
  
  export default AirbnbAdminComponent;
  
