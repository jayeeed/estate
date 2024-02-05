// ReservationRequestForm.jsx

import { useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { FormLabel, Box } from "@mui/material";
import { useTheme } from "@emotion/react";

const ReserveApply = () => {
  const [guestName, setGuestName] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const { propertyId } = useParams();
  const ctheme = useTheme();
  console.log(propertyId);

  const handleRequestSubmit = async () => {
    try {
      // Send the reservation request to the server
      const response = await axios.post("/api/reservation-requests", {
        guestName,
        checkInDate,
        checkOutDate,
        additionalDetails,
      });

      console.log("Reservation request submitted:", response.data);
      // You can redirect or show a success message here
    } catch (error) {
      console.error("Error submitting reservation request:", error);
      // Handle error, show an error message, or redirect to an error page
    }
  };

  return (
    <Box

      m={"10px"}
    //   boxShadow={ctheme.palette.boxShadow}
      boxShadow={"0px 0px 18px 0px #6363633b"}
      borderRadius={"20px"}
    >
      <Card>
        <CardContent>
          <Typography variant="h3">
            {" "}
            This property is now in on demand!!!{" "}
          </Typography>
          <Typography variant="h5" gutterBottom>
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
            <Box marginBlock={1}>
              <FormLabel> Check-In Date </FormLabel>
              <TextField
                type="date"
                fullWidth
                margin="dense"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                required
              />
              <FormLabel> Check-Out Date </FormLabel>
              <TextField
                type="date"
                fullWidth
                margin="dense"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                required
              />
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

export default ReserveApply;
