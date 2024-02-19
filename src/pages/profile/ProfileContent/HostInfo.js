// Sure! Here's an example of a React component for an Airbnb host profile info page:

// ```javascript
import React, { useState, useEffect } from "react";
import axios from "axios";

const HostProfileInfo = ({ userId }) => {
  const [hostInfo, setHostInfo] = useState(null);

  useEffect(() => {
    const fetchHostInfo = async () => {
      try {
        const response = await axios.get(`/api/host/${userId}`);
        setHostInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHostInfo();
  }, [userId]);

  if (!hostInfo) {
    return <div>Loading host profile...</div>;
  }

  return (
    <div>
      <h2>{hostInfo.name}</h2>
      <h4>Email: {hostInfo.email}</h4>
      <p>About: {hostInfo.about}</p>
      <p>Location: {hostInfo.location}</p>
      <p>Joined: {hostInfo.joined}</p>
      <img src={hostInfo.profilePicture} alt="Profile" />
    </div>
  );
};

export default HostProfileInfo;
// ```

// In this example, the `HostProfileInfo` component receives a `userId` prop that represents the host's user ID. It uses the `useState` hook to manage the `hostInfo` state, which will hold the host's profile information.

// Inside the `useEffect` hook, a request is made to retrieve the host's profile information using the provided `userId`. Upon successfully fetching the data, it sets the `hostInfo` state with the response data.

// While waiting for the data to load, the component displays a loading message. Once the `hostInfo` is available, it renders the host's name, email, about section, location, join date, and profile picture.

// Make sure to adapt the code to match your project's API endpoints and data structure.

// Let me know if you need further help!


<div style={{ display: "flex" }}>
{/* Left side */}
<div style={{ flex: 1 }}>
  <Typography variant="body1">
    <strong>User Name:</strong> {userInfo.name}
  </Typography>
  <Typography variant="body1">
    <strong>Date of Birth:</strong> {userInfo.regex_data.dob}
  </Typography>
  <Typography variant="body1">
    <strong>Full Name:</strong>{" "}
    {`${userInfo.personalInfo.firstName} ${userInfo.personalInfo.lastName}`}
  </Typography>
</div>
{/* Right side */}
<div style={{ flex: 1 }}>
  <Typography variant="subtitle1" color="textSecondary">
    <strong>Email:</strong> {userInfo.email}
  </Typography>

  <Typography variant="body1">
    <strong>Phone Number:</strong>{" "}
    {userInfo.personalInfo.phoneNumber}
  </Typography>
</div>
</div>



<Box>
{/* Left side */}
<Grid container rowSpacing={1} columnSpacing={3} justifyContent="flex-start">
  <Grid item xs={6}>
    <Typography variant="body1" align="right">
      <strong>User Name:</strong>
    </Typography>
  </Grid>
  <Grid item xs={6}>
    <Typography variant="body1">{userInfo.name}</Typography>
  </Grid>
  <Grid item xs={6}>
    <Typography variant="body1" align="right">
      <strong>Date of Birth:</strong>
    </Typography>
  </Grid>
  <Grid item xs={6}>
    <Typography variant="body1">
      {userInfo.regex_data.dob}
    </Typography>
  </Grid>
  <Grid item xs={6}>
    <Typography variant="body1" align="right">
      <strong>Full Name:</strong>
    </Typography>
  </Grid>
  <Grid item xs={6}>
    <Typography variant="body1">
      {`${userInfo.personalInfo.firstName} ${userInfo.personalInfo.lastName}`}
    </Typography>
  </Grid>
</Grid>

{/* Right side */}
<Grid container rowSpacing={1} columnSpacing={3} justifyContent="flex-end">
  <Grid item xs={6}>
    <Typography variant="body1" align="right">
      <strong>Email:</strong>
    </Typography>
  </Grid>
  <Grid item xs={6}>
    <Typography variant="body1" align="left">
      {userInfo.email}
    </Typography>
  </Grid>
  <Grid item xs={6}>
    <Typography variant="body1" align="right">
      <strong>Phone Number:</strong>
    </Typography>
  </Grid>
  <Grid item xs={6}>
    <Typography variant="body1" align="left">
      {userInfo.personalInfo.phoneNumber}
    </Typography>
  </Grid>
</Grid>
</Box>