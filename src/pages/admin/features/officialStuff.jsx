import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LegalDocumentPreview from "./template";
import AdminLayout from "../../../layouts/adminLayout";
// import { useTheme } from "@emotion/react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      sx={{
        backgroundColor: "white",
        borderTopRightRadius: "16px",
        borderBottomRightRadius: "16px",
      }} // Set background color to white
      width={"100%"}
    >
      {value === index && (
        <Box sx={{ p: 3, marginBlock: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AdminLayout title={"Official Documents"} sx={{ margin: 0, padding: 0 }}>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          height: "100vh",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          sx={{
            borderColor: "divider",
            // borderRadius: 3,
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: "16px",
            backgroundColor: "#f0f0f0", // Filled color for the tabs' tab
            minWidth: "240px",
          }}
        >
          <Tab
            label="Renter Applications"
            {...a11yProps(0)}
            sx={{
              marginBlock: 1,
              backgroundColor: value === 0 ? "#ffffff" : "#f0f0f0",
            }}
          />
          <Tab
            label="Lease Violations"
            {...a11yProps(1)}
            sx={{
              marginBlock: 1,
              backgroundColor: value === 1 ? "#ffffff" : "#f0f0f0",
            }}
          />
          <Tab
            label="Item Three"
            {...a11yProps(2)}
            sx={{
              marginBlock: 1,
              backgroundColor: value === 2 ? "#ffffff" : "#f0f0f0",
            }}
            disabled
          />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Typography variant="h2" fontWeight={"bold"}>
            Tenant Application Preview
          </Typography>
          <LegalDocumentPreview documentType="rentingApplication" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography variant="h2" fontWeight={"bold"}>
            Lease Violation Preview
          </Typography>
          <LegalDocumentPreview documentType="leaseViolation" />
        </TabPanel>
      </Box>
    </AdminLayout>
  );
}
