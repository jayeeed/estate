import {
  // Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  // Table,
  Typography,
} from "@mui/material";
import { useAuthInfo } from "../../../helpers/AuthCheck";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";

const ProfileView = () => {
  const userInfo = useAuthInfo();

  return (
    <Box p={1}>
      <Box marginBlock={1}>
        <Typography variant="h4">Personal Information</Typography>
      </Box>
      <Divider />
      <Box>
        <Grid
          container
          spacing={0}
          justifyContent={"center"}
          alignContent={"center"}
        >
          <Grid item xs={6}>
            <Table sx={{ borderRadius: 4, marginBlock: 2 }}>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ border: "none", lineHeight: 0 }}>
                    <Typography variant="body1" sx={{ lineHeight: 0 }}>
                      <strong>User Name:</strong>
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ border: "none", lineHeight: 0 }}>
                    <Typography variant="body1" sx={{ lineHeight: 0 }}>
                      {userInfo.name}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: "none", lineHeight: 0 }}>
                    <Typography variant="body1" sx={{ lineHeight: 0 }}>
                      <strong>Date of Birth:</strong>
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ border: "none", lineHeight: 0 }}>
                    <Typography variant="body1" sx={{ lineHeight: 0 }}>
                      {userInfo.regex_data.dob}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: "none", lineHeight: 0 }}>
                    <Typography variant="body1" sx={{ lineHeight: 0 }}>
                      <strong>Full Name:</strong>
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <Typography variant="body1" sx={{ lineHeight: 0 }}>
                      {`${userInfo.personalInfo.firstName} ${userInfo.personalInfo.lastName}`}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={6}>
            <Table sx={{ borderRadius: 4, marginBlock: 2 }}>
              <TableBody>
                <TableRow>
                  <TableCell style={{ border: "none" }}>
                    <Typography variant="subtitle1" sx={{ lineHeight: 0 }}>
                      <strong>Email:</strong>
                    </Typography>
                  </TableCell>
                  <TableCell style={{ border: "none" }}>
                    <Typography variant="subtitle1" sx={{ lineHeight: 0 }}>
                      {userInfo.email}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ border: "none" }}>
                    <Typography variant="body1" sx={{ lineHeight: 0 }}>
                      <strong>Phone Number:</strong>
                    </Typography>
                  </TableCell>
                  <TableCell style={{ border: "none" }}>
                    <Typography variant="body1" sx={{ lineHeight: 0 }}>
                      {userInfo.personalInfo.phoneNumber}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Box>
      <Box marginBlock={1}>
        <Typography variant="h4">Income Sources</Typography>
      </Box>
      <Divider />
      <Table sx={{ borderRadius: 4, marginBlock: 2 }}>
        <TableBody>
          <TableRow>
            <TableCell sx={{ border: "none" }}>
              <Typography variant="body1" sx={{ lineHeight: 0 }}>
                <strong>Source:</strong>{" "}
                {userInfo.personalInfo.incomeSources.incomeSource}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ border: "none" }}>
              <Typography variant="body1" sx={{ lineHeight: 0 }}>
                <strong>Office Name:</strong>{" "}
                {userInfo.personalInfo.incomeSources.officeName}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ border: "none" }}>
              <Typography variant="body1" sx={{ lineHeight: 0 }}>
                <strong>Workplace Location:</strong>{" "}
                {userInfo.personalInfo.incomeSources.workplaceLocation}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* <Divider style={{ margin: "20px 0" }} /> */}{" "}
      <Box marginBlock={1}>
        <Typography variant="h4">Emergency Contacts</Typography>
      </Box>
      <Divider />
      <Table sx={{ borderRadius: 4, marginBlock: 2 }}>
        <TableBody>
          <TableRow>
            <TableCell style={{ border: "none" }}>
              <Typography variant="body1" sx={{ lineHeight: 0 }}>
                <strong>Name:</strong>{" "}
                {userInfo.personalInfo.emergencyContact.emergencyContactName}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ border: "none" }}>
              <Typography variant="body1" sx={{ lineHeight: 0 }}>
                <strong>Relationship:</strong>{" "}
                {userInfo.personalInfo.emergencyContact.relationship}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ border: "none" }}>
              <Typography variant="body1" sx={{ lineHeight: 0 }}>
                <strong>Phone Number:</strong>{" "}
                {
                  userInfo.personalInfo.emergencyContact
                    .emergencyContactPhoneNumber
                }
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
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
