// import React, { useState } from 'react';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import axios from 'axios';

// const JobPostForm = ({ onClose }) => {
//   const [jobTitle, setJobTitle] = useState('');
//   const [company, setCompany] = useState('');
//   const [location, setLocation] = useState('');
//   const [description, setDescription] = useState('');

//   const handleJobTitleChange = (e) => {
//     setJobTitle(e.target.value);
//   };

//   const handleCompanyChange = (e) => {
//     setCompany(e.target.value);
//   };

//   const handleLocationChange = (e) => {
//     setLocation(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   const handleJobSubmit = () => {
//     // You can perform any necessary actions with the job details here
//     console.log('Job posted:', { jobTitle, company, location, description });

//     // Perform Axios POST request
//     axios.post('YOUR_API_ENDPOINT', jobData)
//       .then(response => {
//         // Handle the successful response, if needed
//         console.log('Job posted successfully:', response.data);

//         // Close the popup
//         onClose();
//       })
//       .catch(error => {
//         // Handle the error, if needed
//         console.error('Error posting job:', error);

//         // Close the popup
//         onClose();
//       });
//   };

//   return (
//     <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle>Create a Job Post</DialogTitle>
//       <DialogContent>
//         <TextField
//           autoFocus
//           margin="dense"
//           id="jobTitle"
//           label="Job Title"
//           type="text"
//           fullWidth
//           variant="outlined"
//           value={jobTitle}
//           onChange={handleJobTitleChange}
//         />
//         <TextField
//           margin="dense"
//           id="company"
//           label="Company"
//           type="text"
//           fullWidth
//           variant="outlined"
//           value={company}
//           onChange={handleCompanyChange}
//         />
//         <TextField
//           margin="dense"
//           id="location"
//           label="Location"
//           type="text"
//           fullWidth
//           variant="outlined"
//           value={location}
//           onChange={handleLocationChange}
//         />
//         <TextField
//           margin="dense"
//           id="description"
//           label="Job Description"
//           type="text"
//           fullWidth
//           multiline
//           rows={4}
//           variant="outlined"
//           value={description}
//           onChange={handleDescriptionChange}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={handleJobSubmit} color="primary">
//           Post Job
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default JobPostForm;

import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const JobPostForm = ({ onClose }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [description, setDescription] = useState('');

  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value);
  };

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleJobSubmit = () => {
    // You can perform any necessary actions with the job details here
    console.log('Job posted:', { jobTitle, company, location, startDate, description });

    // Close the popup
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create a Job Post</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="jobTitle"
          label="Job Title"
          type="text"
          fullWidth
          variant="outlined"
          value={jobTitle}
          onChange={handleJobTitleChange}
        />
        <TextField
          margin="dense"
          id="company"
          label="Company"
          type="text"
          fullWidth
          variant="outlined"
          value={company}
          onChange={handleCompanyChange}
        />
        <TextField
          margin="dense"
          id="location"
          label="Location"
          type="text"
          fullWidth
          variant="outlined"
          value={location}
          onChange={handleLocationChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            margin="dense"
            id="startDate"
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            fullWidth
            renderInput={(params) => <TextField {...params} variant="outlined" />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={['DateTimePicker', 'DateTimePicker', 'DateTimePicker']}
      >
        <DateTimePicker label="disabled" disabled />
        <DateTimePicker label="readOnly" readOnly />
        <DateTimePicker label="name" name="startDateTime" />
      </DemoContainer>
    </LocalizationProvider>
        <TextField
          margin="dense"
          id="description"
          label="Job Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={description}
          onChange={handleDescriptionChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleJobSubmit} color="primary">
          Post Job
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobPostForm;



