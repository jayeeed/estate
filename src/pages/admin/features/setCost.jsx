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
import axios from "axios";

const AirbnbHostSettings = () => {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [hostCost, setHostCost] = useState(0);
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("europe");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedTimeZone, setSelectedTimeZone] = useState("");
  const [currentSettings, setCurrentSettings] = useState({
    selectedRegion: selectedRegion,
    selectedCountry: "",
    selectedCurrency: "",
    selectedTimeZone: "",
    hostCost: 0,
    subscriptionActive: false,
    category: "",
  });

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    setSelectedCountry(""); // Reset selected country when region changes
    setCurrentSettings((prevSettings) => ({
      ...prevSettings,
      selectedRegion: region,
      selectedCountry: "",
      selectedCurrency: "",
      selectedTimeZone: "",
    }));
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setCurrentSettings((prevSettings) => ({
      ...prevSettings,
      selectedCountry: country,
      selectedCurrency: "",
      selectedTimeZone: "",
    }));
  };

  const handleCurrencyChange = (e) => {
    const currency = e.target.value;
    setSelectedCurrency(currency);
    setCurrentSettings((prevSettings) => ({
      ...prevSettings,
      selectedCurrency: currency,
    }));
  };

  const handleTimeZoneChange = (e) => {
    const timeZone = e.target.value;
    setSelectedTimeZone(timeZone);
    setCurrentSettings((prevSettings) => ({
      ...prevSettings,
      selectedTimeZone: timeZone,
    }));
  };

  const handleSubscriptionChange = (e) => {
    const checked = e.target.checked;
    setSubscriptionActive(checked);
    setCurrentSettings((prevSettings) => ({
      ...prevSettings,
      subscriptionActive: checked,
    }));
  };

  const handleHostCostChange = (e) => {
    const cost = e.target.value;
    setHostCost(cost);
    setCurrentSettings((prevSettings) => ({
      ...prevSettings,
      hostCost: cost,
    }));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentSettings((prevSettings) => ({
      ...prevSettings,
      category: e.target.value,
    }));
  };

  useEffect(() => {
    fetchCountries();
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedCountry) {
      fetchSettings();
    }
  }, [selectedCountry]);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/region/${selectedRegion}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const countries = data.map((country) => country.name.common);
        setCurrentSettings((prevSettings) => ({
          ...prevSettings,
          countries: countries,
        }));
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${selectedCountry}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const countryData = data[0];
        const currencies = Object.keys(countryData.currencies || {});
        const timezones = countryData.timezones || [];

        setCurrentSettings((prevSettings) => ({
          ...prevSettings,
          currencies: currencies,
          timezones: timezones,
        }));

        // Reset selected currency and time zone if not in the new lists
        if (!currencies.includes(selectedCurrency)) {
          setSelectedCurrency("");
        }
        if (!timezones.includes(selectedTimeZone)) {
          setSelectedTimeZone("");
        }
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const fetchCategory = async () => {
    try {
      // Make a GET request to the amenities endpoint
      const response = await axios.get("/category");
      // Assuming the response data is structured as { amenities: [...] }
      setCategory(response.data.category);
      console.log("Category:", response.data.category);
      // Handle the retrieved amenities data as needed
    } catch (error) {
      // Handle any errors that occur during the GET request
      console.error("Error fetching amenities:", error);
      // Optionally, show an error message to the user
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        hostCost: hostCost,
        subscriptionActive: subscriptionActive,
        Region: selectedRegion,
        Country: selectedCountry,
        Currency: selectedCurrency,
        TimeZone: selectedTimeZone,
        Category: selectedCategory,
      };
      // console.log(formData);
      // Make a POST request to your API endpoint with the form data
      const response = await axios.post("/set-cost", formData);

      // // Handle the response as needed
      console.log("Form submitted successfully:", response.data);
      // Optionally, you can reset the form fields or show a success message to the user
    } catch (error) {
      // Handle any errors that occur during the POST request
      console.error("Error submitting form:", error);
      // Optionally, you can show an error message to the user
    }
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
                  <Typography variant="body1" marginBlock={2}>Select Region:</Typography>
                  <Select
                    value={selectedRegion}
                    defaultValue="europe"
                    onChange={handleRegionChange}
                  >
                    <MenuItem value="global">Global</MenuItem>
                    <MenuItem value="europe">Europe</MenuItem>
                    <MenuItem value="asia">Asia</MenuItem>
                  </Select>
                </Grid>
                {selectedRegion && (
                  <Grid item xs={12}>
                    <Typography variant="body1" marginBlock={2} >Select Country:</Typography>

                    <Select
                      value={selectedCountry}
                      onChange={handleCountryChange}
                    >
                      {currentSettings.countries &&
                        currentSettings?.countries.map((country) => (
                          <MenuItem key={country} value={country}>
                            {country}
                          </MenuItem>
                        ))}
                    </Select>
                  </Grid>
                )}
                {selectedCountry && (
                  <Grid item xs={12}>
                    <Typography variant="body1" marginBlock={2}>Select Currency:</Typography>
                    <Select
                      value={selectedCurrency}
                      onChange={handleCurrencyChange}
                    >
                      {currentSettings.currencies &&
                        currentSettings?.currencies.map((currency) => (
                          <MenuItem key={currency} value={currency}>
                            {currency}
                          </MenuItem>
                        ))}
                    </Select>
                  </Grid>
                )}
                {selectedCurrency && (
                  <Grid item xs={12}>
                    <Typography variant="body1" marginBlock={2}>Select Time Zone:</Typography>
                    <Select
                      value={selectedTimeZone}
                      onChange={handleTimeZoneChange}
                    >
                      {currentSettings.timezones &&
                        currentSettings?.timezones.map((timezone) => (
                          <MenuItem key={timezone} value={timezone}>
                            {timezone}
                          </MenuItem>
                        ))}
                    </Select>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Typography variant="body1" marginBlock={2}>
                    Select Property Category:
                  </Typography>
                  <Select 
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    {category.map((categoryItem, index) => (
                      <MenuItem key={index} value={categoryItem.title}>
                        {categoryItem.title}{" "}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Host Cost"
                    type="number"
                    value={hostCost}
                    onChange={handleHostCostChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Checkbox
                    checked={subscriptionActive}
                    onChange={handleSubscriptionChange}
                  />
                  <Typography variant="caption">
                    Activate Subscription
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            {/* Table */}
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
                      <TableCell>{currentSettings?.selectedCountry}</TableCell>
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
            </Box>
          </Box>
          <Box textAlign={"right"} marginBlock={3}>
            <Button type="submit" variant="contained">
              Fix this Rate
            </Button>
          </Box>
        </form>
      </AdminLayout>
    </>
  );
};

export default AirbnbHostSettings;

{
  /* <Box sx={{ p: 3 }}>
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
  </Box> */
}
