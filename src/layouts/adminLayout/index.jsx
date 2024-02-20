import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

const AdminLayout = ({ children, title }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      {isMdScreen ||
        (drawerOpen && (
          <Box
            onClick={toggleDrawer}
            sx={{
              backgroundColor: "#00000050",
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              zIndex: 5,
              bottom: 0,
            }}
          />
        ))}
      <SideBar setOpen={setDrawerOpen} open={drawerOpen} />
      <Box
        p={3}
        sx={{
          background: "#ddecff",
          minHeight: "100vh",
          width: "-webkit-fill-available",
          marginLeft: isMdScreen ? "270px" : "0",
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        <TopBar setOpen={setDrawerOpen} open={drawerOpen} title={title} />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
