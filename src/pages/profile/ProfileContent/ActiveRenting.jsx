import * as React from "react";
import Box from "@mui/material/Box";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useAuthInfo } from "../../../helpers/AuthCheck";
import axios from "axios";
import { Link } from "react-router-dom";
import IssueSidebar from "../../raisedIssues/tenat-raised";

const ActiveRentingTable = () => {
  const [activeRentingData, setActiveRentingData] = React.useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = React.useState(null);

  const userInfo = useAuthInfo();
  const renterId = userInfo._id;
  console.log(renterId);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/active-bookins?renterId=${renterId}`
        );
        setActiveRentingData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(activeRentingData);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ fontWeight: "bold", fontSize: "24px" }}>
            <TableRow>
              <TableCell>
                <b>
                  {" "}
                  <big> Place</big>{" "}
                </b>
              </TableCell>
              <TableCell>
                <b>
                  {" "}
                  <big>Title</big>{" "}
                </b>
              </TableCell>
              <TableCell>
                <b>
                  {" "}
                  <big>Address</big>{" "}
                </b>
              </TableCell>
              <TableCell>
                <b>
                  {" "}
                  <big>Staying</big>{" "}
                </b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activeRentingData.map((rental, index) => (
              <TableRow
                key={index}
                onClick={() => {
                  setSelectedPropertyId((prevId) =>
                    prevId === rental.propertyId._id
                      ? null
                      : rental.propertyId._id
                  );
                }}
              >
                <TableCell>
                  <Box
                    component="img"
                    p={1}
                    mr={2}
                    width={"5.625rem"}
                    height={"5.625rem"}
                    borderRadius="10px"
                    bgcolor="#e0eeff"
                    display="flex"
                    textAlign="center"
                    alignItems="center"
                    justifyContent="center"
                    src={rental.propertyId.images[0].url}
                  ></Box>
                </TableCell>
                <TableCell>{rental.propertyId.title}</TableCell>

                <TableCell>
                  {rental.propertyId.address.addressLine1},{" "}
                  {rental.propertyId.address.city},{" "}
                  {rental.propertyId.address.state}
                </TableCell>
                <TableCell>{rental.stayDays} days</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Right sidebar with RaiseIssue form */}
      {selectedPropertyId && <IssueSidebar propertyId={selectedPropertyId} />}
    </Box>
  );
};

export default ActiveRentingTable;

// <Button variant="black" onClick={handleClickOpen}>Your ActiveRenting</Button>
// <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
//     <DialogTitle>Where you live</DialogTitle>
//     <DialogContent>
//         <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
//             <Paper
//                 component="form"
//                 sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
//             >
//                 <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
//                     <SearchIcon />
//                 </IconButton>
//                 <FormControl sx={{ m: 1, minWidth: 300 }}>
//                     <InputLabel htmlFor="grouped-native-select">City</InputLabel>
//                     <Select native defaultValue="" id="grouped-native-select" label="Grouping">
//                         <option aria-label="None" value="" />
//                         <optgroup>
//                             <option value={1}>Dhaka, Bangladesh</option>
//                             <option value={2}>ctg</option>
//                             <option value={1}>b</option>
//                             <option value={2}>j</option>
//                         </optgroup>
//                     </Select>
//                 </FormControl>
//                 <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
//                     <CloseIcon />
//                 </IconButton>
//             </Paper>
//         </Box>
//     </DialogContent>
//     <DialogActions>
//         <Button onClick={handleClose}>Cancel</Button>
//         <Button onClick={handleClose}>Save</Button>
//     </DialogActions>
// </Dialog>
