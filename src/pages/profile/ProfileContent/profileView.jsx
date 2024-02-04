import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { useAuthInfo } from "../../../helpers/AuthCheck";

const ProfileView = () => {
    const userInfo = useAuthInfo();
    return (
        <Box p={1}>
            <Card>
                <CardContent>
                    <Grid container spacing={3}>
                        {/* <Grid item xs={12} sm={4}>
                            <Avatar alt={userInfo.name} src={userInfo.url} style={{ width: "150px", height: "150px" }} />
                        </Grid> */}
                        <Grid item xs={12} sm={8}>
                            <Typography variant="h4">
                                {userInfo.name}
                            </Typography>

                            <Grid item xs={12} sm={8}>
                                <Typography variant="h4">
                                    {userInfo.personalInfo}
                                </Typography>


                                <Typography variant="subtitle1" color="textSecondary">
                                    {userInfo.email}
                                </Typography>



                                <Divider style={{ margin: "10px 0" }} />
                                <Typography variant="body1">
                                    <strong>Date of Birth:</strong> {userInfo.regex_data.dob}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>National ID:</strong> {userInfo.regex_data.nid}
                                </Typography>
                                {/* Add other user information fields */}
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ProfileView;


{/* <Typography variant="subtitle1" color="textSecondary">
                {userInfo.role === "userInfo" ? "Renter" : "Host"}
              </Typography> */}