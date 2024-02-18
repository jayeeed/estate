import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  FormGroup,
  FormLabel,
} from "@mui/material";

const RentalApplicationForm = () => {
  const [guestName, setGuestName] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [sharePersonalInfo, setSharePersonalInfo] = useState(false);
  const [shareEmploymentInfo, setShareEmploymentInfo] = useState(false);
  const [shareFinancialInfo, setShareFinancialInfo] = useState(false);
  const [shareRentalHistory, setShareRentalHistory] = useState(false);
  const [shareBackgroundInfo, setShareBackgroundInfo] = useState(false);
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


  const handleRequestSubmit = async () => {
    try {
      const response = await axios.post(`VITE_API_BASE_URL/${"endpoint"}`, {
        guestName,
        checkInDate,
        checkOutDate,
        additionalDetails,
        sharePersonalInfo,
        shareFinancialInfo,
        // Include other form fields as needed
      });
      console.log("Form submitted successfully:", response.data);
      // Optionally, handle success response here (e.g., show a success message)
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally, handle error response here (e.g., show an error message)
    }
  };

  return (
    <Box
      p={"10px"}
      m={"10px"}
      boxShadow={"0px 0px 14px 0px #6363633b"}
      borderRadius={"20px"}
    >
      <Card>
        <CardContent>
          <Typography variant="h3" color={"red"}>
            {" "}
            This property is now in on demand!!!{" "}
          </Typography>
          <Typography variant="h5" gutterBottom marginBlock={1}>
            Reservation Request
          </Typography>
          <form>
            <TextField
              label="Guest Name"
              fullWidth
              margin="dense"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
            />
            {/* Inline form for Check-In and Check-Out dates */}
            <Box
              display={"flex"}
              spacing={0}
              textAlign={"center"}
              justifyContent={"space-between"}
              marginBlock={1}
            >
              <Box width={"48%"}>
              
                <TextField
                
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  required
                  
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  InputProps={{
                    inputProps: {
                      placeholder: "Check-In",
                      
                    },
                  }}
                />
              </Box>
              <Box width={"48%"}>
              
                <TextField
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  required
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  InputProps={{
                    inputProps: {
                      placeholder: "Check-Out",
                    },
                  }}
                />
              </Box>
            </Box>

            <TextField
              label="What's the purpose?"
              fullWidth
              multiline
              rows={4}
              margin="dense"
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
            />
            {/* Checkboxes for sharing personal information */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={sharePersonalInfo}
                  onChange={(e) => setSharePersonalInfo(e.target.checked)}
                  color="primary"
                />
              }
              sx={{ marginBlock: 1 }}
              label="I consent to share my personal information with the property host."
            />
            {/* Checkboxes for other sections */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={sharePersonalInfo}
                  onChange={(e) => setShareFinancialInfo(e.target.checked)}
                  color="primary"
                />
              }
              sx={{ marginBlock: 1 }}
              label="I consent to share my financial information with the property host."
            />
            {/* Add similar checkboxes for other sections such as employment, financial, rental history, background info */}
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleRequestSubmit}
              fullWidth
              sx={{ mt: 2 }}
            >
              Submit Request
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RentalApplicationForm;
