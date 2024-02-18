import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';



const HostCostView = () => {
  const [hostCosts, setHostCosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHostCosts();
  }, []);

  const fetchHostCosts = async () => {
    try {
      const response = await axios.get("/viewCost");
      setHostCosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching host costs:", error);
    }
  };


  return (
    <Box marginBlock={2} marginInline={1} >
      <Typography variant="h4" fontWeight={"bold"} marginBlock={2}>Cost view</Typography>
      <Box>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <TableContainer component={Paper}   sx={{
            width: '100%',
            maxHeight: 400,
            borderRadius: 4,
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}>
            <Table stickyHeader>
              <TableHead >  
              {/* style={{ backgroundColor: "#f0f0f0"  }} */}
                <TableRow>
                  {/* <TableCell  style={{ width: '30%' }}>Region</TableCell> */}
                  <TableCell  style={{ width: '30%', fontWeight:"bold" }}>Country</TableCell>
                  <TableCell  style={{ width: '10%',fontWeight:"bold" }}>Currency</TableCell>
                  <TableCell  style={{ width: '10%',fontWeight:"bold" }}>Host Cost</TableCell>
                  {/* <TableCell  style={{ width: '30%' }}>Subscription Active</TableCell> */}
                  <TableCell  style={{ width: '30%',fontWeight:"bold" }}>Time Zone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hostCosts.map((cost) => (
                  <TableRow key={cost._id}>
                    {/* <TableCell>{cost.Region}</TableCell> */}
                    <TableCell>{cost.Country}</TableCell>
                    <TableCell>{cost.Currency}</TableCell>
                    <TableCell>{cost.hostCost}{" "}%</TableCell>
                    {/* <TableCell>{cost.subscriptionActive ? "Yes" : "No"}</TableCell> */}

                    <TableCell>{cost.TimeZone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default HostCostView;

  
  
  
  
  
  // viewCost
//   const [hostCosts, setHostCosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchHostCosts();
//     console.log(hostCosts);
//   }, []);

//   const fetchHostCosts = async () => {
//     try {
//       const response = await axios.get("/viewCost");
//       setHostCosts(response.data);
//       console.log(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching host costs:", error);
//     }
//   };






// <Box marginBlock={2} marginInline={1}>
// <Typography variant="h3">Cost view</Typography>
// </Box>

// <Box>
// {/* <div>

//   {loading ? (
//     <Typography>Loading...</Typography>
//   ) : (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Region</TableCell>
//             <TableCell>Country</TableCell>
//             <TableCell>Host Cost</TableCell>
//             <TableCell>Subscription Active</TableCell>
//             <TableCell>Selected Currency</TableCell>
//             <TableCell>Selected Timezone</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody sx={{ paddingInline: 2}}>
//           {hostCosts.map((cost) => (
//             <TableRow key={cost._id} >
//               <TableCell>{cost.Region}</TableCell>
//               <TableCell>{cost.Country}</TableCell>
//               <TableCell>{cost.hostCost}</TableCell>
//               <TableCell>
//                 {cost.subscriptionActive ? "Yes" : "No"}
//               </TableCell>
//               <TableCell>{cost.Currency}</TableCell>
//               <TableCell>{cost.TimeZone}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   )}
// </div>
//  */}
// </Box>