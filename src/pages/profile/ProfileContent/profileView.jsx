import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useAuthInfo } from "../../../helpers/AuthCheck";

const ProfileView = () => {
const userInfo = useAuthInfo();

    return (
      <Box p={3}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              {/* <Grid item xs={12} sm={4}>
                <Avatar alt={userInfo.name} src={userInfo.avatar.url} style={{ width: '150px', height: '150px' }} />
              </Grid> */}
              <Grid item xs={12} sm={8}>
                <Typography variant="h4">{userInfo.name}</Typography>
  
                <Typography variant="subtitle1" color="textSecondary">
                  {userInfo.email}
                </Typography>
  
                <Divider style={{ margin: '10px 0' }} />
  
                <Typography variant="h6">Personal Information</Typography>
                {/* <Typography variant="body1">
                  <strong>Date of Birth:</strong> {userInfo.regex_data.dob}
                </Typography> */}
                {/* <Typography variant="body1">
                  <strong>National ID:</strong> {userInfo.regex_data.nid} */}
                {/* </Typography>
                <Typography variant="body1">
                  <strong>Full Name:</strong> {`${userInfo.personalInfo.firstName} ${userInfo.personalInfo.lastName}`}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone Number:</strong> {userInfo.personalInfo.phoneNumber}
                </Typography>
  
                <Divider style={{ margin: '20px 0' }} />
  
                <Typography variant="h6">Income Sources</Typography>
                <Typography variant="body1">
                  <strong>Source:</strong> {userInfo.personalInfo.incomeSources.incomeSource}
                </Typography>
                <Typography variant="body1">
                  <strong>Office Name:</strong> {userInfo.personalInfo.incomeSources.officeName}
                </Typography>
                <Typography variant="body1">
                  <strong>Workplace Location:</strong> {userInfo.personalInfo.incomeSources.workplaceLocation}
                </Typography>
  
                <Divider style={{ margin: '20px 0' }} />
  
                <Typography variant="h6">Emergency Contact</Typography>
                <Typography variant="body1">
                  <strong>Name:</strong> {userInfo.personalInfo.emergencyContact.emergencyContactName}
                </Typography>
                <Typography variant="body1">
                  <strong>Relationship:</strong> {userInfo.personalInfo.emergencyContact.relationship}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone Number:</strong> {userInfo.personalInfo.emergencyContact.emergencyContactPhoneNumber}
                </Typography> */}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
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