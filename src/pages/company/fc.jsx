import { Box } from "@mui/material";
import CreateCompanyProfile from "./addCompany";
import backgroundSVG from "./assets/fCcreate.svg"; // Adjust the path based on your actual file structure

const FCompany = () => {
  const containerStyle = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90%", // Use the full viewport heights
  };

  const backgroundStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "80%", // Adjust the width as needed
    height: "70%", // Adjust the height as needed
    backgroundImage: `url(${backgroundSVG})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    filter: "blur(3px)", 
  };

  const contentStyle = {
    width: "100%", // Adjust the width of the form as needed
    marginInlineStart: "23%", // Move the form 1/3 to the left of the center
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    position: "relative",
  };

  return (
    <Box sx={containerStyle}>
      <Box sx={backgroundStyle} />
      <Box sx={contentStyle} paddingBlock={25} paddingInline={4}>
        <h2>Create Company Page</h2>
        <CreateCompanyProfile />
      </Box>
    </Box>
  );
};

export default FCompany;
