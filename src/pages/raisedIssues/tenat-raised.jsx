import { useState } from "react";
import axios from "axios";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import {
  Typography,
  Slider,
  FormControlLabel,
  Checkbox,

} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const IssueSidebar = ({ propertyId }) => {
  const [formData, setFormData] = useState({
    issueDescription: "",
    issuePriority: 1, // Initial priority level
    file: null,
    categories: {
      plumbing: false,
      electrical: false,
      structural: false,
      other: false,
    },
  });
  const [isDrawerOpen, setDrawerOpen] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { issueDescription, issuePriority, file, categories } = formData;

      // Convert image file to base64 string
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = function () {
        const base64Image = fileReader.result;

        const formData = new FormData();
        formData.append("propertyId", propertyId);
        formData.append("issueDescription", issueDescription);
        formData.append("issuePriority", issuePriority);
        Object.entries(categories).forEach(([key, value]) => {
          if (value) {
            formData.append("categories", key);
          }
        });
        formData.append("image", base64Image); // Append base64 string instead of file

        // Submit form data with base64 image
        axios
          .post("/api/submit-issue", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("Form submitted successfully:", response.data);
            // Reset form data after submission
            setFormData({
              issueDescription: "",
              issuePriority: 1, // Reset priority level to 1
              file: null,
              categories: {
                plumbing: false,
                electrical: false,
                structural: false,
                other: false,
              },
            });
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
          });
      };
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePriorityChange = (event, newValue) => {
    setFormData({
      ...formData,
      issuePriority: newValue,
    });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      categories: {
        ...formData.categories,
        [name]: checked,
      },
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
      <Box m={2} p={2} width={310}>
        <Typography variant="h4">Raise Issue</Typography>
        <Box my={2}>
          {propertyId && (
            <Typography variant="body1">
              You are raising an issue for property with ID:
              <br /> {propertyId}
            </Typography>
          )}
          <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
            <Typography id="priority-slider" gutterBottom>
              Issue Priority Level
            </Typography>
            <Box marginInline={2}>
              <Slider
                name="issuePriority"
                value={formData.issuePriority}
                onChange={handlePriorityChange}
                aria-labelledby="priority-slider"
                step={1}
                min={1}
                max={5}
                marks={[
                  { value: 1, label: "Low" },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5, label: "High" },
                ]}
                style={{ marginBottom: "16px" }}
              />
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.categories.plumbing}
                  onChange={handleCheckboxChange}
                  name="plumbing"
                />
              }
              label="Plumbing"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.categories.electrical}
                  onChange={handleCheckboxChange}
                  name="electrical"
                />
              }
              label="Electrical"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.categories.structural}
                  onChange={handleCheckboxChange}
                  name="structural"
                />
              }
              label="Structural"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.categories.other}
                  onChange={handleCheckboxChange}
                  name="other"
                />
              }
              label="Other"
            />
            <TextareaAutosize
            
              name="issueDescription"
              minRows={4} // Set default rows to 4
              placeholder="Issue Description"
              value={formData.issueDescription}
              onChange={handleInputChange}
              style={{ width: "100%", marginBlock: "16px" }}
            />
            <Box display="flex" alignItems="center" paddingBlock={2}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <Button variant="outlined">
                  <AttachFileIcon />
                  Upload Image
                </Button>
              </label>
            </Box>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              style={{ marginRight: "8px" }}
            >
              Submit Issue
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleDrawerClose}
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
