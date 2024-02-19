import { useState } from "react";
import axios from "axios";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const IssueSidebar = ({ propertyId }) => {
  const [issueDescription, setIssueDescription] = useState("");
  const [file, setFile] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("propertyId", propertyId);
      formData.append("issueDescription", issueDescription);
      formData.append("image", file);

      const response = await axios.post("/api/submit-issue", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Form submitted successfully:", response.data);

      setIssueDescription("");
      setFile(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
            <Typography variant="body1">
              You are raising an issue for property with ID:
              <br /> {propertyId}
            </Typography>
          )}
          <form onSubmit={handleSubmit} style={{ marginBlock: "8px" }}>
            <label>
              Issue Description:
              <TextareaAutosize
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                minRows={3}
                style={{ width: "100%", marginBottom: "10px" }}
              />
            </label>
            <label>
              Upload Image:
              <input type="file" onChange={handleFileChange} />
            </label>
            <Button type="submit" variant="contained" color="primary">
              Submit Issue
            </Button>{" "}
            <Button
              onClick={handleDrawerClose}
              variant="outlined"
              color="secondary"
            >
              Close
            </Button>
          </form>
        </Box>
      </Box>
    </Drawer>
  );
};

export default IssueSidebar;
