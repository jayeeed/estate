import { useState } from "react";
import { Box, Button, Drawer } from "@mui/material";
import DashboardLayout from "../../layouts/hostDashboard";
import { Link } from "react-router-dom";
import {
  AddCircleRounded,
  CloudUploadRounded,
  WorkHistoryRounded,
  BusinessCenterRounded,
  BusinessRounded,
} from "@mui/icons-material";
import CreateCompanyProfile from "./addCompany";
import CompanyProfileView from "./comProfileView";
import SubCompany from "./addSubCom";
import CompanyProfileEditForm from "./editComProfile";
import JobPostForm from "./jobPost";

const CompanyProfileInfo = () => {
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showSub, setShowSub] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleJobClick = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleClose = () => {
    setIsSidebarOpen(false);
  };

  const handleClick = () => {
    setShowAddCompany(true);
  };

  const handleSubClick = () => {
    setShowSub(true);
    setIsSidebarOpen(true);
    setShowEdit(false);
  };

  const handleEditClick = () => {
    setIsSidebarOpen(true);
    setShowSub(false);
    setShowEdit(true);
  };

  return (
    <>
      <DashboardLayout title={"Company info"} >
        <Box marginBlock={2} marginInline={0} textAlign={"right"}>
          <Button
            sx={{
              textTransform: "capitalize",
              borderRadius: "30px",
              margin: "2px",
            }}
            variant="outlined"
            color="primary"
            onClick={handleEditClick}
          >
            <CloudUploadRounded sx={{ color: "f3f3f3", pr: 1 }} />
            Edit Profile
          </Button>

          <Button
            sx={{
              textTransform: "capitalize",
              borderRadius: "30px",
              margin: "2px",
            }}
            variant="outlined"
            color="primary"
            onClick={handleJobClick}
          >
            <WorkHistoryRounded sx={{ color: "f3f3f3", pr: 1 }} />
            Post a job
          </Button>

          <Button
            sx={{
              textTransform: "capitalize",
              borderRadius: "30px",
              margin: "2px",
            }}
            variant="outlined"
            color="primary"
            onClick={handleClick}
          >
            <BusinessCenterRounded sx={{ color: "f3f3f3", pr: 1 }} />
            Create a Company
          </Button>

          <Button
            sx={{
              textTransform: "capitalize",
              borderRadius: "30px",
              margin: "2px",
            }}
            variant="outlined"
            color="primary"
            onClick={handleSubClick}
          >
            <BusinessRounded sx={{ color: "f3f3f3", pr: 1 }} />
            add a sub Company
          </Button>

          <Link to={"/add-properties"}>
            <Button
              sx={{
                textTransform: "capitalize",
                borderRadius: "30px",
                margin: "2px",
              }}
              variant="outlined"
              color="primary"
            >
              <AddCircleRounded sx={{ color: "f3f3f3", pr: 1 }} />
              Add a Property
            </Button>
          </Link>
        </Box>
        <Box sx={{ margin: 0}}>
          {/* Conditionally render the AddCompany component */}
          {showAddCompany && <CreateCompanyProfile /> ? (
            <CreateCompanyProfile />
          ) : (
            <CompanyProfileView />
          )}

          {isPopupOpen && <JobPostForm onClose={closePopup} />}
        </Box>

        <Drawer anchor="right" open={isSidebarOpen} onClose={handleClose}>
          {/* Content for the right sidebar goes here */}
          <div>
            {showEdit && !showSub && <CompanyProfileEditForm />}
            {showSub && !showEdit && <SubCompany />}
          </div>
        </Drawer>
      </DashboardLayout>{" "}
    </>
  );
};

export default CompanyProfileInfo;

{
  /* <Box margin={5} textAlign={"right"}>
      <Link to={"/add-company"}>
                  <Button
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "30px",
                    }}
                    variant="outlined"
                    color="primary"
                  >
                    <AddCircleRounded sx={{ color: "f3f3f3", pr: 1 }} />
                    Create a Company
                  </Button>
                </Link>
            </Box> */
}
