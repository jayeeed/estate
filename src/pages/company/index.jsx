import { useState, useEffect } from 'react'
import { Container, Box, Typography, TextField, Button, Grid, Drawer } from '@mui/material';
import DashboardLayout from "../../layouts/hostDashboard";
import { Link } from 'react-router-dom';
import { AddCircleRounded, CloudUploadRounded } from '@mui/icons-material';
import CreateCompanyProfile from './addCompany';
import CompanyProfileView from './comProfileView';
import SubCompany from './addSubCom';
import CompanyProfileEditForm from './editComProfile';





const companyProfileInfo = () => {

  const [showAddCompany, setShowAddCompany] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showSub, setShowSub] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

 

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
      <DashboardLayout title={"Company info"}>

        <Box margin={2} textAlign={"right"} >


          <Button
            sx={{
              textTransform: "capitalize",
              borderRadius: "30px",
              margin: "2px"
            }}
            variant="outlined"
            color="primary"
            onClick={handleEditClick}
          >
            <CloudUploadRounded sx={{ color: "f3f3f3", pr: 1 }} />
            Edit page
          </Button>



          <Button
            sx={{
              textTransform: "capitalize",
              borderRadius: "30px",
              margin: "2px"
            }}
            variant="outlined"
            color="primary"
            onClick={handleClick}
          >
            <AddCircleRounded sx={{ color: "f3f3f3", pr: 1 }} />
           View applications
          </Button>



          <Button
            sx={{
              textTransform: "capitalize",
              borderRadius: "30px",
              margin: "2px"
            }}
            variant="outlined"
            color="primary"
            onClick={handleClick}
          >
            <AddCircleRounded sx={{ color: "f3f3f3", pr: 1 }} />
            Post a job
          </Button>


          <Button
            sx={{
              textTransform: "capitalize",
              borderRadius: "30px",
              margin: "2px"
            }}
            variant="outlined"
            color="primary"
            onClick={handleClick}
          >
            <AddCircleRounded sx={{ color: "f3f3f3", pr: 1 }} />
            Create a Company
          </Button>
         
          <Button
            sx={{
              textTransform: "capitalize",
              borderRadius: "30px",
              margin: "2px"
            }}
            variant="outlined"
            color="primary"
            onClick={handleSubClick}
          >
            <AddCircleRounded sx={{ color: "f3f3f3", pr: 1 }} />
            add a sub Company
          </Button>
          
          <Link to={"/add-properties"}>
            <Button
              sx={{
                textTransform: "capitalize",
                borderRadius: "30px",
                margin: "2px"
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


          {showEdit && !showSub && <CompanyProfileEditForm />}
    {showSub && !showEdit && <SubCompany />}

            

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