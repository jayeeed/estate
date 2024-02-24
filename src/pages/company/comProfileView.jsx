/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import {
  Typography,
  CardMedia,
  Box,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
} from "@mui/material";
import "./pany.css"; // Import the external CSS file
import { useAuthInfo } from "../../helpers/AuthCheck";
import axios from "axios";

// Custom TabPanel component
const CustomTabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const CompanyProfilePanels = () => {
  const [value, setValue] = useState(0);
  const [companyData, setCompanyData] = useState({});
  const userInfo = useAuthInfo();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`/user/companies/${userInfo._id}`);
        setCompanyData(response.data);
        console.log(response.data)
        // console.log(companyData["companyLogo"]);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, []); // Empty dependency array to ensure the effect runs only once

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/get-all-jobs"); // Replace '/api/jobs' with your actual endpoint
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`/user/properties/${userInfo._id}`);
        setProperties(response.data.properties);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <Grid container spacing={0}>
      {/* Left side content */}
      <Grid item xs={12} sm={7} md={8}>
        <Box className="root" marginBlock={2} marginInline={1}>
          <CardMedia
            component="img"
            alt="Banner"
            height="250px"
            image={`data:image/png;base64,${companyData["companyLogo"]}`}
            className="banner"
            sx={{ borderRadius: 4 }}
          />
          {/* <Avatar alt="Company Logo" src={`data:image/png;base64,${logoBase64}`} /> */}
          {/* ... other image elements */}
          <Box className="content" display={"block"} position={"relative"}>
            <Box
              component="img"
              src={`data:image/png;base64,${companyData["companyBanner"]}`}
              // src="src/pages/company/assets/OIP.jpeg"
              className="avatar"
            />

            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleChange} aria-label="tabs">
                <Tab label="Home" />
                <Tab label="About" />
                <Tab label="jobs" />
              </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
              <Typography variant="h3" className="title">
              {companyData.companyName} Propreties & Co
              </Typography>
              <br />
              <Typography variant="body1">
                Registration Number: 735568-{companyData.companyRegistrationNumber}{" "}
              </Typography>

              <Typography variant="body1">
                Address: {companyData.companyAddress}{" "}
              </Typography>
              {/* 
              {companyData.map((company) => (
                <>

                  <Typography gutterBottom variant="h4" component="div">
                    {company.companyName}
                  </Typography>
                  <Typography variant="body1">
                    Registration Number: {company.companyRegistrationNumber}
                  </Typography>
                  <Typography variant="body1">
                    Address: {company.companyAddress}
                  </Typography>
                </>
              ))} */}

              <Typography variant="body1" className="details">
                Our moto: {companyData.companyAdditionalDetails}
              </Typography>

              <Typography variant="h4" className="title">
                Certification
              </Typography>
              <br />
              <Typography variant="body1" className="details">
                {companyData.companyAppreciationDetails}
              </Typography>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              <Typography variant="h4" className="title">
                Overview
              </Typography>
              <br />
              <Typography variant="body1" className="details">
                At Ipsita, we redefine the experience of property ownership.
                With a commitment to excellence and a passion for creating
                exceptional spaces, we specialize in providing unparalleled real
                estate solutions. Our team of experts is dedicated to
                understanding your unique needs and aspirations, guiding you
                through a seamless journey of finding or managing your dream
                property. Immerse yourself in a world where innovation meets
                tradition, where every property tells a story of quality,
                craftsmanship, and attention to detail. Whether you are
                searching for your dream home, an investment opportunity, or
                comprehensive property management services, we offer a
                personalized approach that exceeds expectations. Discover a
                portfolio of distinctive properties that embody elegance,
                comfort, and sophistication. From urban residences to
                countryside estates, we curate a diverse range of options
                tailored to suit your lifestyle. At [Company Name], integrity is
                the cornerstone of our philosophy. We prioritize transparency,
                trust, and client satisfaction, ensuring that every interaction
                leaves a lasting positive impression. Elevate your real estate
                experience with a partner who values your aspirations as much as
                you do. Welcome to a world where property transcends beyond
                bricks and mortar – where it becomes an expression of your
                identity, a sanctuary of memories, and an investment in your
                future. Your journey to exceptional living starts here.
              </Typography>
              <Typography variant="body1" className="details">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                eius soluta porro ducimus dolores architecto nesciunt ipsam
                voluptates deserunt suscipit maiores, magni neque id
                repudiandae, nulla quam mollitia sit quo?
              </Typography>
            </CustomTabPanel>
            {/* this is for Job  */}
            <CustomTabPanel value={value} index={2}>
              {/* <Grid container spacing={3}>
      {jobs.map(job => (
        <Grid item key={job._id} xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {job.jobTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Company: {job.companyName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Location: {job.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start Date: {new Date(job.startDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description: {job.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid> */}

              <Grid container spacing={2}>
                <Grid item xs={12} sm={8} md={6}>
                  <Card sx={{ marginBottom: 2 }}>
                    <CardMedia
                      component="img"
                      // alt={title}
                      height="180"
                      image="src/pages/company/assets/jobs.jpeg" // Placeholder image URL
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h4" component="div">
                        {/* {title} */} Cleaning
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {/* Location: {location} */}
                        Location: Dhaka
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {/* Company: {company} */}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Repellat optio natus doloremque? Similique quis voluptas
                        maxime autem repudiandae repellendus dolor eum
                        accusantium, laborum et exercitationem provident, atque
                        nesciunt, aliquam voluptatum.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={8} md={6}>
                  <Card sx={{ marginBottom: 2 }}>
                    <CardMedia
                      component="img"
                      // alt={title}
                      height="180"
                      image="src/pages/company/assets/jobs.jpeg" // Placeholder image URL
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h4" component="div">
                        {/* {title} */} Renovation
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {/* Location: {location} */}
                        Location: Dhaka
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {/* Company: {company} */}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Repellat optio natus doloremque? Similique quis voluptas
                        maxime autem repudiandae repellendus dolor eum
                        accusantium, laborum et exercitationem provident, atque
                        nesciunt, aliquam voluptatum.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={8} md={6}>
                  <Card sx={{ marginBottom: 2 }}>
                    <CardMedia
                      component="img"
                      // alt={title}
                      height="180"
                      image="src/pages/company/assets/jobs.jpeg" // Placeholder image URL
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h4" component="div">
                        {/* {title} */} Plumbing
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {/* Location: {location} */}
                        Location: Dhaka
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {/* Company: {company} */}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Repellat optio natus doloremque? Similique quis voluptas
                        maxime autem repudiandae repellendus dolor eum
                        accusantium, laborum et exercitationem provident, atque
                        nesciunt, aliquam voluptatum.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CustomTabPanel>
          </Box>
        </Box>
      </Grid>

      {/* Right side property cards */}
      <Grid item xs={12} sm={5} md={4}>
        <Box marginInline={2}>
          {properties.map((property, index) => (
            <Card key={index} sx={{ marginBlock: 2, borderRadius: 4 }}>
              <CardMedia
                component="img"
                alt={property.title}
                height="200"
                sx={{ objectFit: "cover" }}
                image={property.images[0].url}
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  {property.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {property.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box marginInline={2}>
          <Card sx={{ marginBlock: 2, borderRadius: 4 }}>
            <CardMedia
              component="img"
              alt="Property 1"
              height="200"
              image="src/pages/company/assets/Rental.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                Property 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Property details...
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ marginBlock: 2, borderRadius: 4 }}>
            <CardMedia
              component="img"
              alt="Property 1"
              height="200"
              sx={{ objectFit: "scale-down" }}
              image="src/pages/company/assets/Rental.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                Property 2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Property details...
              </Typography>
            </CardContent>
          </Card>

          {/* Add more property cards as needed */}
          <Card sx={{ marginBlock: 2 }}>
            <CardMedia
              component="img"
              alt="Property 1"
              height="180"
              sx={{ objectFit: "cover" }}
              image="src/pages/company/assets/real-es.webp"
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                Property 3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Property details...
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CompanyProfilePanels;

// const CompanyProfileView = () => {
//     const [companyProfile, setCompanyProfile] = useState(null);

//     //   useEffect(() => {
//     //     // Fetch company profile data using Axios
//     //     getApi('/api/get-company-profile-data')
//     //       .then((data) => {
//     //         setCompanyProfile(data);
//     //       })
//     //       .catch((error) => {
//     //         console.error('Error fetching company profile data:', error);
//     //       });
//     //   }, []);

//     //   if (!companyProfile) {
//     //     return <p>Loading company profile data...</p>;
//     //   }

//     return (
//         <>
//             <Box className='root'>
//                 <CardMedia
//                     component="img"
//                     alt="Banner"
//                     height="240px"
//                     image='src/pages/company/assets/closeup-shot-person-thinking-buying-selling-house.jpg'
//                     // image={companyProfile.bannerUrl}
//                     className="banner"
//                 />
//                 <Box className="content" display={"block"} position={"realtive"}>
//                     <Box
//                         component="img"
//                         src="src/pages/company/assets/OIP.jpeg"
//                         //   alt={companyProfile.companyName}
//                         //   src={companyProfile.logoUrl}
//                         className="avatar"
//                     />

//                     <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//                         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//                             <Tab label="Item One" {...a11yProps(0)} />
//                             <Tab label="Item Two" {...a11yProps(1)} />
//                             <Tab label="Item Three" {...a11yProps(2)} />
//                         </Tabs>
//                     </Box>
//                     <CustomTabPanel value={value} index={0}>
//                         Item One
//                     </CustomTabPanel>
//                     <CustomTabPanel value={value} index={1}>
//                         Item Two
//                     </CustomTabPanel>
//                     <CustomTabPanel value={value} index={2}>
//                         Item Three
//                     </CustomTabPanel>

//                     <Typography variant="h4" className="title">
//                         {/* {companyProfile.companyName} */} Vai Bashar
//                     </Typography>
//                     <Typography variant="body1" className="company-details">
//                         {/* Registration Number: {companyProfile.registrationNumber} */}
//                         7355689345697454e
//                     </Typography>
//                     <Typography variant="body1" className="company-details">
//                         {/* New Address: {companyProfile.newAddress} */}
//                         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga dignissimos ad, quae nemo esse animi repellat deleniti aliquid mollitia minima nihil. Vitae debitis inventore perferendis minima voluptatibus. Beatae, nisi harum?
//                     </Typography>
//                     <Typography variant="body1" className="details">
//                         {/* Bank Account Number: {companyProfile.bankAccountNumber} */}
//                         847395364567783
//                     </Typography>
//                     <Typography variant="body1" className="details">
//                         {/* Additional Details: {companyProfile.additionalDetails} */}
//                         Assuming you have a field for the banner URL in your company profile data
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae eos nisi enim iusto tempora reprehenderit quia aliquam iure ipsum. Ex maiores autem et a veniam! Optio praesentium placeat rerum neque.
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam recusandae sapiente illum? Omnis dolorem voluptates optio odit error, iure temporibus nemo libero, tenetur officia blanditiis laboriosam, facere asperiores sed adipisci?
//                     </Typography>
//                 </Box>
//             </Box>

//         </>
//     );
// };

// export default CompanyProfileView;

// const fetchCompanyProfileData = async () => {
//     // Simulate fetching data from the server
//     const response = await fetch('http://localhost:5050/get-company-profile-data');
//     const data = await response.json();
//     return data;
//   };
