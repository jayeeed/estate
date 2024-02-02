import { useState, useEffect } from 'react'
import { Container, Box, Typography, TextField, Button, Grid, Drawer } from '@mui/material';
import DashboardLayout from "../../layouts/hostDashboard";
import { Link } from 'react-router-dom';
import { AddCircleRounded } from '@mui/icons-material';
import CreateCompanyProfile from './addCompany';
import CompanyProfileView from './comProfileView';
import SubCompany from './addSubCom';
import CompanyProfileEditForm from './editComProfile';





const companyProfileInfo = () => {

  const [showAddCompany, setShowAddCompany] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSubClick = () => {
    setIsSidebarOpen(true);
  };

  const handleClose = () => {
    setIsSidebarOpen(false);
  };

  const handleClick = () => {
    setShowAddCompany(true);
  };

  const handleEditClick = () => {
    setShowEdit(true);
  };
  

  return (
    <>
      <DashboardLayout title={"Company info"}>

        <Box margin={2} textAlign={"right"}>


        <Button
            sx={{
              textTransform: "capitalize",
              borderRadius: "30px",
            }}
            variant="outlined"
            color="primary"
            onClick={handleEditClick}
          >
            <AddCircleRounded sx={{ color: "f3f3f3", pr: 1 }} />
            Edit page
          </Button>
{" "}
          <Button
            sx={{
              textTransform: "capitalize",
              borderRadius: "30px",
            }}
            variant="outlined"
            color="primary"
            onClick={handleClick}
          >
            <AddCircleRounded sx={{ color: "f3f3f3", pr: 1 }} />
            Create a Company
          </Button>
          {" "}
          <Button
            sx={{
              textTransform: "capitalize",
              borderRadius: "30px",
            }}
            variant="outlined"
            color="primary"
            onClick={handleSubClick}
          >
            <AddCircleRounded sx={{ color: "f3f3f3", pr: 1 }} />
            add a sub Company
          </Button>
          {" "}
          <Link to={"/add-properties"}>
            <Button
              sx={{
                textTransform: "capitalize",
                borderRadius: "30px",
              }}
              variant="outlined"
              color="primary"
            >
              <AddCircleRounded sx={{ color: "f3f3f3", pr: 1 }} />
              Add a Property
            </Button>
          </Link>

        </Box>

        {/* Conditionally render the AddCompany component */}
        {showAddCompany && <CreateCompanyProfile /> ? <CreateCompanyProfile /> : <CompanyProfileView />}
       



        <Drawer
          anchor="right"
          open={isSidebarOpen}
          onClose={handleClose}
        >
          {/* Content for the right sidebar goes here */}
          <div>


            {showEdit && <CompanyProfileEditForm /> ? <CompanyProfileEditForm /> : <SubCompany />}

          </div>
        </Drawer>



      </DashboardLayout> </>
  )
}

export default companyProfileInfo;



{/* <Box margin={5} textAlign={"right"}>
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
            </Box> */}