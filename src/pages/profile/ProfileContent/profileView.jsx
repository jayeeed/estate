import {
  // Avatar,
  Box,
  // Card,
  // CardContent,
  Divider,
  Grid,
  // Table,
  Typography,
} from "@mui/material";
import { useAuthInfo } from "../../../helpers/AuthCheck";
import { List, ListItem, ListItemText,  } from "@mui/material";

const ProfileView = () => {
  const userInfo = useAuthInfo();
  console.log(userInfo);

  return (
    <Box p={1}>
      <Box marginBlock={1}>
        <Typography variant="h4">Personal Information</Typography>
      </Box>
      <Divider />
      <Box sx={{ marginBottom: 1 }}>
        <Grid
          container
          spacing={0}
          justifyContent={"center"}
          alignContent={"center"}
        >
          <Grid item xs={6}>
            <List>
              <ListItem disablePadding>
                <ListItemText
                  primaryTypographyProps={{ variant: "body1" }}
                  secondaryTypographyProps={{ variant: "body1" }}
                  primary={<strong>User Name:</strong>}
                  secondary={userInfo.name}
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText
                  primaryTypographyProps={{ variant: "body1" }}
                  secondaryTypographyProps={{ variant: "body1" }}
                  primary={<strong>Date of Birth:</strong>}
                  secondary={userInfo.regex_data.dob}
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText
                  primaryTypographyProps={{ variant: "body1" }}
                  secondaryTypographyProps={{ variant: "body1" }}
                  primary={<strong>Full Name:</strong>}
                  secondary={`${userInfo.personalInfo.firstName} ${userInfo.personalInfo.lastName}`}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <List>
              <ListItem disablePadding>
                <ListItemText
                  primaryTypographyProps={{ variant: "body1" }}
                  secondaryTypographyProps={{ variant: "body1" }}
                  primary={<strong>Email:</strong>}
                  secondary={userInfo.email}
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText
                  primaryTypographyProps={{ variant: "body1" }}
                  secondaryTypographyProps={{ variant: "body1" }}
                  primary={<strong>Phone Number:</strong>}
                  secondary={userInfo.personalInfo.phoneNumber}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
  
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h4">Income Sources</Typography>
      </Box>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemText
            primaryTypographyProps={{ variant: "body1" }}
            secondaryTypographyProps={{ variant: "body1" }}
            primary={<strong>Source:</strong>}
            secondary={userInfo.personalInfo.incomeSources.incomeSource}
          />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText
            primaryTypographyProps={{ variant: "body1" }}
            secondaryTypographyProps={{ variant: "body1" }}
            primary={<strong>Office Name:</strong>}
            secondary={userInfo.personalInfo.incomeSources.officeName}
          />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText
            primaryTypographyProps={{ variant: "body1" }}
            secondaryTypographyProps={{ variant: "body1" }}
            primary={<strong>Workplace Location:</strong>}
            secondary={userInfo.personalInfo.incomeSources.workplaceLocation}
          />
        </ListItem>
      </List>
  
      <Box marginBlock={1}>
        <Typography variant="h4">Emergency Contacts</Typography>
      </Box>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemText
            primaryTypographyProps={{ variant: "body1" }}
            secondaryTypographyProps={{ variant: "body1" }}
            primary={<strong>Name:</strong>}
            secondary={userInfo.personalInfo.emergencyContact.emergencyContactName}
          />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText
            primaryTypographyProps={{ variant: "body1" }}
            secondaryTypographyProps={{ variant: "body1" }}
            primary={<strong>Relationship:</strong>}
            secondary={userInfo.personalInfo.emergencyContact.relationship}
          />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText
            primaryTypographyProps={{ variant: "body1" }}
            secondaryTypographyProps={{ variant: "body1" }}
            primary={<strong>Phone Number:</strong>}
            secondary={userInfo.personalInfo.emergencyContact.emergencyContactPhoneNumber}
          />
        </ListItem>
      </List>
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
