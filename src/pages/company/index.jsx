import { useState, useEffect } from 'react'
import { Container, Box, Typography, TextField, Button, Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HostLetterTemplate from './letterPreview'
import DashboardLayout from "../../layouts/hostDashboard";
import { Link } from 'react-router-dom';
import { AddCircleRounded } from '@mui/icons-material';
import CreateCompanyProfile from './addCompany';
import CompanyProfileView from './comProfileView';






const companyProfileInfo = () => {

  const [showAddCompany, setShowAddCompany] = useState(false);

  const handleClick = () => {
    setShowAddCompany(true);
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
                    onClick={handleClick}
                  >
                    <AddCircleRounded sx={{ color: "f3f3f3", pr: 1 }} />
                    Create a Company
                  </Button>
             
            </Box>

        {/* Conditionally render the AddCompany component */}
        {showAddCompany && <CreateCompanyProfile /> ? <CreateCompanyProfile /> : <CompanyProfileView/> }


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