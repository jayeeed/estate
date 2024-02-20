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
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import CustomizedSnackbars from "../../../components/snackbar";

const AirbnbHostSettings = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading indicator

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("europe");
  const [currentSettings, setCurrentSettings] = useState({
    selectedRegion: selectedRegion,
    selectedCountry: "",
    selectedCurrency: "",
    selectedTimeZone: "",
    hostCost: 0,
    subscriptionActive: false,
    category: "",
  });
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [hostCost, setHostCost] = useState(0);
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedTimeZone, setSelectedTimeZone] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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

  useEffect(() => {
    if (currentSettings.currencies && currentSettings.currencies.length > 0) {
      console.log("Current currencies:", currentSettings.currencies);
      const currency = currentSettings.currencies[0];
      setSelectedCurrency(currency);
      setCurrentSettings((prevSettings) => ({
        ...prevSettings,
        selectedCurrency: currency,
      }));
    }
    if (currentSettings.timezones && currentSettings.timezones.length > 0) {
      console.log("Current timeZone:", currentSettings.timezones);
      const timeZone = currentSettings.timezones[0];
      setSelectedTimeZone(timeZone);
      setCurrentSettings((prevSettings) => ({
        ...prevSettings,
        selectedTimeZone: timeZone,
      }));
    }
  }, [currentSettings.currencies, currentSettings.timezones]);

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
      setCategory(response.data.category);
      console.log("Category:", response.data.category);
    } catch (error) {
      console.error("Error fetching amenities:", error);
      // Optionally, show an error message to the user
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when saving template
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
      console.log("server response:", response.data.message);
      setOpen(true);
      setMessage(`Rate fixed the ${selectedCountry}`);
      setType("success");

      // Optionally, you can reset the form fields or show a success message to the user
    } catch (error) {
      // Handle any errors that occur during the POST request
      console.error("Error submitting form:", error);
      // Optionally, you can show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminLayout title={"Hosting Cost Setup"}>
        <Box marginBlock={2}>
          <Typography variant="caption" textAlign="center">
            {" "}
            *Note: You just need to select, it will automaticly update your
            current setting in the database, if your selected info are not in
            database it will create a new one{" "}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={0}>
            {/* Sidebar */}
            <Grid item xs={12} sm={6} md={3}>
              <Box padding={2}>
              <Typography variant="h3" marginBottom={2} >
                Estate Host Settings
              </Typography>
              <Grid container spacing={2} justifyContent={"center"} justifyItems={"center"} alignItems={"center"} >
                <Grid item xs={12} >
                  <Typography variant="body1" marginBlock={1}>
                    Select Region:
                  </Typography>
                  <Select
                 
                    required
                    value={selectedRegion}
                    defaultValue="europe"
                    onChange={handleRegionChange}
                    sx={{ width: "90%", paddingInline: 2 ,marginInline:"auto" }}
                  >
                    <MenuItem value="global">Global</MenuItem>
                    <MenuItem value="europe">Europe</MenuItem>
                    <MenuItem value="asia">Asia</MenuItem>
                  </Select>
                </Grid>
                {selectedRegion && (
                  <Grid item xs={12}>
                    <Typography variant="body1" marginBlock={1}>
                      Select Country:
                    </Typography>

                    <Select
                      required
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      sx={{ width: "90%", paddingInline: 2 }}
                    >
                      {currentSettings.countries &&
                        currentSettings?.countries.map((country) => (
                          <MenuItem key={country} value={country} >
                            {country}
                          </MenuItem>
                        ))}
                    </Select>
                  </Grid>
                )}
                {selectedCountry && (
                  <Grid item xs={12}>
                    <Typography variant="body1" marginBlock={1}>
                      Select Currency:
                    </Typography>
                    <Select
                      required
                      value={selectedCurrency}
                      defaultValue={
                        currentSettings.currencies &&
                        currentSettings.currencies.length > 0
                          ? currentSettings.currencies[0]
                          : ""
                      }
                      onChange={handleCurrencyChange}
                      sx={{ width: "90%", paddingInline: 2 }}
                    >
                      {currentSettings.currencies &&
                        currentSettings.currencies.map((currency, index) => (
                          <MenuItem key={index} value={currency}>
                            {currency}
                          </MenuItem>
                        ))}
                    </Select>
                  </Grid>
                )}
                {selectedCurrency && (
                  <Grid item xs={12}>
                    <Typography variant="body1" marginBlock={1}>
                      Select Time Zone:
                    </Typography>
                    <Select
                      required
                      value={selectedTimeZone}
                      sx={{ width: "90%", paddingInline: 2 }}
                      defaultValue={
                        currentSettings.timezones &&
                        currentSettings.timezones.length > 0
                          ? currentSettings.timezones[0]
                          : ""
                      }
                      onChange={handleTimeZoneChange}
                    >
                      {currentSettings.timezones &&
                        currentSettings?.timezones.map((timezone, index) => (
                          <MenuItem key={index} value={timezone}>
                            {timezone}
                          </MenuItem>
                        ))}
                    </Select>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Typography variant="body1" marginBlock={1}>
                    Select Property Category:
                  </Typography>
                  <Select
                    required
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    sx={{ width: "90%", paddingInline: 2 }}
                  >
                    {category.map((categoryItem, index) => (
                      <MenuItem key={index} value={categoryItem._id}>
                        {categoryItem.title}{" "}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={12} marginBlock={2}>
                  <TextField
                    label="Host Cost"
                    type="number"
                    required
                    value={hostCost}
                    onChange={handleHostCostChange}
                    sx={{ width: "90%",  }}
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
              
            </Grid>
            {/* Table */}
            <Grid item xs={12} sm={6} md={8}>
              <Box
                // component="main"
                sx={{
                  
                  flexGrow: 1,
                  bgcolor: "background.default",
                  paddingBlock: 2,
                  paddingInline: 3,
                  borderRadius: "12px",
                  overflowX: 'auto'
                }}
              >
                <TableContainer component={Paper}>
                  <Table  aria-label="current settings">
                    <TableHead sx={{ backgroundColor: "#003019" }}>
                      <TableRow>
                        <TableCell colSpan={2}>
                          <Box display={"flex"}>
                            <Typography variant="h4" color={"white"} sx={{}}>
                              Current Settings
                            </Typography>
                            {loading && (
                              <CircularProgress
                                sx={{ paddingInline: 1, mt: 0 }}
                                size={26}
                                color="inherit"
                              />
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Region/Country:
                        </TableCell>
                        <TableCell>
                          {currentSettings?.selectedCountry}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Category Id:
                        </TableCell>
                        <TableCell>{currentSettings?.category}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Host Cost (In percentage):
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
                        <TableCell>
                          {currentSettings?.selectedCurrency}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell component="th" scope="row">
                          Time Zone:
                        </TableCell>
                        <TableCell>
                          {currentSettings?.selectedTimeZone}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign={"right"} marginBlock={3}>
            <Button type="submit" variant="contained">
              Fix this Rate
            </Button>
          </Box>
        </form>

        <CustomizedSnackbars
          open={open}
          message={message}
          type={type}
          onClose={handleClose}
        />
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
