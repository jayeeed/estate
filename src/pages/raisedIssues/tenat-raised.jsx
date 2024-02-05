import { useState } from "react";
import axios from "axios";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const IssueSidebar = ({ propertyId }) => {
  const [issueDescription, setIssueDescription] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an Axios POST request to submit the form data
      const response = await axios.post("/api/submit-issue", {
        propertyId,
        issueDescription,
      });

      // Assuming your API returns some response data
      console.log("Form submitted successfully:", response.data);

      // Optionally, you can reset the form after submission
      setIssueDescription("");

      // Callback to handle form submission in the parent component
      //   onFormSubmit(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
      <Box p={2} width={310}>
        <Typography variant="h2">Raise Issue</Typography>
        <Box marginBlock={5}>
          {propertyId && (
            <Typography variant="body1">You are raising an issue for property with ID:
            <br/> {propertyId}</Typography>
          )}
          <form onSubmit={handleSubmit} style={{ marginBlock:"8px"}}>
            <label>
              Issue Description:
              <TextareaAutosize
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                minRows={3}
                style={{ width: "100%", marginBottom: "10px" }}
              />
            </label>
            <Button type="submit" variant="contained" color="primary">
              Submit Issue
            </Button>
          </form>
        </Box>
      </Box>
    </Drawer>
  );
};

export default IssueSidebar;

// const handleFormSubmit = async (formData) => {
//     try {
//       // Assuming you have a function to handle form submission in the parent component
//       // (e.g., saving the issue to the database)
//       console.log('Submitting form data:', formData);

//       // Make a request to submit the issue to the server
//       const response = await axios.post('/api/submit-issue', formData);

//       // Optionally, you can log or handle the response from the server
//       console.log('Server response:', response.data);

//       // Reset the selectedPropertyId to close the sidebar
//       setSelectedPropertyId(null);
//     } catch (error) {
//       console.error('Error handling form submission:', error);
//     }
//   };
