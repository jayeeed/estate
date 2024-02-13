import {
  // Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useAuthInfo } from "../../../helpers/AuthCheck";
// import { Table, TableBody, TableCell, TableRow } from "@mui/material";

const ProfileView = () => {
  const userInfo = useAuthInfo();

  return (
    <Box p={1}>

          <Box marginBlock={1}>
            <Typography variant="h4">Personal Information</Typography>
          </Box>
    
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

          <Divider style={{ margin: "20px 0" }} />

          <Typography variant="h6">Income Sources</Typography>
          <Typography variant="body1">
            <strong>Source:</strong>{" "}
            {userInfo.personalInfo.incomeSources.incomeSource}
          </Typography>
          <Typography variant="body1">
            <strong>Office Name:</strong>{" "}
            {userInfo.personalInfo.incomeSources.officeName}
          </Typography>
          <Typography variant="body1">
            <strong>Workplace Location:</strong>{" "}
            {userInfo.personalInfo.incomeSources.workplaceLocation}
          </Typography>

          <Divider style={{ margin: "20px 0" }} />

          <Typography variant="h6">Emergency Contact</Typography>
          <Typography variant="body1">
            <strong>Name:</strong>{" "}
            {userInfo.personalInfo.emergencyContact.emergencyContactName}
          </Typography>
          <Typography variant="body1">
            <strong>Relationship:</strong>{" "}
            {userInfo.personalInfo.emergencyContact.relationship}
          </Typography>
          <Typography variant="body1">
            <strong>Phone Number:</strong>{" "}
            {userInfo.personalInfo.emergencyContact.emergencyContactPhoneNumber}
          </Typography>

    </Box>
  );
};

export default ProfileView;

{
  /* <Typography variant="subtitle1" color="textSecondary">
                  {userInfo.role === "userInfo" ? "Renter" : "Host"}
                </Typography> */
}

// <Paper elevation={3} style={{ padding: '20px', margin: '20px', maxWidth: '600px' }}>
//       <Typography variant="h4" gutterBottom>
//         Profile Information
//       </Typography>

//       <Typography>
//         <strong>Name:</strong> {name}
//       </Typography>
//       <Typography>
//         <strong>Email:</strong> {email}
//       </Typography>
//       <Typography>
//         <strong>Role:</strong> {role}
//       </Typography>
//       <Typography>
//         <strong>Status:</strong> {status}
//       </Typography>
//       <Typography>
//         <strong>Type:</strong> {type}
//       </Typography>
//       <Typography>
//         <strong>Email Verification:</strong> {isEmailVerified ? 'Verified' : 'Not Verified'}
//       </Typography>

//       <Typography variant="h5" gutterBottom>
//         Profile Information
//       </Typography>
//       <List>
//         <ListItem>
//           <ListItemText
//             primary={<strong>Full Name:</strong>}
//             secondary={`${firstName} ${lastName}`}
//           />
//         </ListItem>
//         <ListItem>
//           <ListItemText primary={<strong>Date of Birth:</strong>} secondary={dateOfBirth} />
//         </ListItem>
//         <ListItem>
//           <ListItemText primary={<strong>Phone Number:</strong>} secondary={phoneNumber} />
//         </ListItem>
//       </List>

//       <Typography variant="h5" gutterBottom>
//         Income Sources
//       </Typography>
//       <List>
//         <ListItem>
//           <ListItemText primary={<strong>Source:</strong>} secondary={incomeSource} />
//         </ListItem>
//         <ListItem>
//           <ListItemText primary={<strong>Office Name:</strong>} secondary={officeName} />
//         </ListItem>
//         <ListItem>
//           <ListItemText
//             primary={<strong>Workplace Location:</strong>}
//             secondary={workplaceLocation}
//           />
//         </ListItem>
//       </List>

//       <Typography variant="h5" gutterBottom>
//         Emergency Contact
//       </Typography>
//       <List>
//         <ListItem>
//           <ListItemText primary={<strong>Name:</strong>} secondary={emergencyContactName} />
//         </ListItem>
//         <ListItem>
//           <ListItemText
//             primary={<strong>Relationship:</strong>}
//             secondary={relationship}
//           />
//         </ListItem>
//         <ListItem>
//           <ListItemText
//             primary={<strong>Phone Number:</strong>}
//             secondary={emergencyContactPhoneNumber}
//           />
//         </ListItem>
//       </List>

//       <Typography variant="h5" gutterBottom>
//         Registration Details
//       </Typography>
//       <Typography>
//         <strong>Registered At:</strong> {new Date(createdAt.$date).toLocaleString()}
//       </Typography>
//       <Typography>
//         <strong>Last Updated At:</strong> {new Date(updatedAt.$date).toLocaleString()}
//       </Typography>
//     </Paper>
//   );
// };
