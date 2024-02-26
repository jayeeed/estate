import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

const columns = [
  { field: 'Country', headerName: 'Country', width: 150 },
  { field: 'Currency', headerName: 'Currency', width: 150 },
  { field: 'hostCost', headerName: 'Host Cost', width: 150 },
  { field: 'TimeZone', headerName: 'Time Zone', width: 150 },
];

// ...

const HostCostView = () => {
  const [hostCosts, setHostCosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchHostCosts();
  }, []);

  const fetchHostCosts = async () => {
    try {
      const response = await axios.get("/viewCost");
      // Assuming each row has a unique identifier field named "_id"
      const updatedHostCosts = response.data.map((row) => ({ ...row, id: row._id }));
      setHostCosts(updatedHostCosts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching host costs:", error);
    }
  };

  return (
    <Box marginBlock={2} marginInline={1}>
      <Typography variant="h4" fontWeight="bold" marginBlock={2}>
        Cost view
      </Typography>
      <Box>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={hostCosts}
              columns={columns}
              pageSize={5}
              checkboxSelection
              getRowId={(row) => row.id}
            />
          </div>
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