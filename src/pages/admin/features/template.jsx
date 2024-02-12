import { useState } from "react";
import axios from "axios"; // Assuming you're using Axios for HTTP requests
import {
  Box,
  Button,
  // Divider,
  FormLabel,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles for react-quill
import CustomizedSnackbars from "../../../components/snackbar";

const decodeHtmlEntities = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const StyledInput = styled("input")({
  display: "none",
});

const LegalDocumentPreview = ({ documentType }) => {
  const customTheme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [message, setMessage] = useState("");
  const [type,setType] = useState("");
  const [templateHTML, setTemplateHTML] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(false);
  const [editorContent, setEditorContent] = useState("");



  const handleClick = () => {
    setOpen(true);
  };


  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setUploadedFile(file);
      setTemplateHTML(e.target.result);
    };

    reader.readAsText(file);
  };

  // Function to update template HTML
  const updateTemplate = (newHTML) => {
    // Update the template in your backend or wherever you store it
    setTemplateHTML(newHTML);
  };

  // Function to handle editing template
  const handleEditTemplate = () => {
    setEditingTemplate(true);
    setEditorContent(decodeHtmlEntities(templateHTML));
  };

  // Function to handle saving edited template
  const handleSaveTemplate = () => {
    updateTemplate(editorContent);
    setEditingTemplate(false);
    // Submit the document based on the documentType
    if (documentType === "rentingApplication") {
      // Handle submitting renting application
      handleSubmit();
      console.log("Submitting renting application:", editorContent);
      setMessage("Submitted renting application")
    } else if (documentType === "legalDocuments") {
      // Handle submitting legal documents
      handleSubmit();
      console.log("Submitting legal documents:", editorContent);
    }
  };

  // const formData = new FormData();
  // formData.append("file", uploadedFile); // Assuming 'file' is the key expected by your server for the uploaded file
  // // Append other form data fields as needed
  // formData.append("field1", value1);
  // formData.append("field2", value2);
  
  // handleSubmit(formData);
  

  // Function to handle submitting the uploaded file data
  const handleSubmit = async () => {
    try {
      // Create a FormData object to store the file data
      const formData = new FormData();
      formData.append("file", uploadedFile); // Assuming 'file' is the key expected by your server for the uploaded file

      // console.log(formData)
  
      // Make a POST request to your server to save the uploaded file data
      const response = await axios.post("/admin/templateUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the correct content type for file upload
        },
      });
  
      console.log("File upload successful:", response.data);
      setOpen(true); // Log the response from the server
      setMessage("File upload successful")
      setType("success")

    } catch (error) {
      console.error("Error uploading file:", error); // Log any errors that occur during the upload process
    }
  };
  

  return (
    <Box>
      <Toolbar
        sx={{
          border: 1,
          borderRadius: 2,
          marginBlock: 2,
          boxShadow: customTheme.shadows,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            flexGrow: 1,
            color: customTheme.palette.primary.text,
            fontWeight: customTheme.typography.fontWeightBold,
          }}
        >
          Legal Document Preview
        </Typography>
        <FormLabel htmlFor="fileInput">
          <StyledInput
            id="fileInput"
            type="file"
            accept=".html"
            onChange={handleFileUpload}
          />
          <Button
            variant="contained"
            component="span"
            sx={{ backgroundColor: customTheme.palette.info, mr: 2 }}
          >
            Upload Template
          </Button>
        </FormLabel>
        {uploadedFile && (
          <Button
            onClick={handleEditTemplate}
            variant="contained"
            sx={{
              backgroundColor: customTheme.palette.secondary.main,
              mr: 2,
            }}
          >
            Edit Template
          </Button>
        )}
        {editingTemplate && (
          <Button
            onClick={handleSaveTemplate}
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
          >
            Save Template
          </Button>
        )}
        {uploadedFile && (
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        )}
      </Toolbar>

      {/* </AppBar> */}

      <Box mt={2} marginTop={6}>
        {uploadedFile && (
          <Box mt={1} p={2}>
            {!editingTemplate ? (
              <Box
                borderRadius={2}
                dangerouslySetInnerHTML={{ __html: templateHTML }}
              />
            ) : (
              <ReactQuill value={editorContent} onChange={setEditorContent} />
            )}
          </Box>
        )}

      </Box>



      <CustomizedSnackbars open={open} message={message} type={type} />
    </Box>
  );
};

export default LegalDocumentPreview;
