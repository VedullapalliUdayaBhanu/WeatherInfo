import React, {  useState, useContext } from 'react'
import Widgets from './Widgets'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Switch, FormControlLabel } from '@mui/material';


import { TextField } from '@mui/material';

import { DataContext } from './DataContext';
import Modal from '@mui/material/Modal';
import Grid from "@mui/material/Grid2";


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Dashboard = () => {

  const [isCelsius, setIsCelsius] = useState(true);
  
  const context = useContext(DataContext);

  const temperatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCelsius(event.target.checked);
    const updatedInfo = info.map(data => {
      const degrees = Number(data.degrees);
      const convertedDegrees = isCelsius 
          ? (degrees - 32) * (5 / 9) // Convert Fahrenheit to Celsius
          : (degrees * 9 / 5) + 32; // Convert Celsius to Fahrenheit
          return {
            ...data,
            degrees: convertedDegrees.toFixed(2) 
        };
  });
  setInfo(updatedInfo)
};

  if (!context) {
    throw new Error('Component must be used within a DataProvider');
  }

  const { info , setInfo , newData, setNewData} = context
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 
  const handleChange = (e : any) => {
    const { name, value } = e.target;
    setNewData({
      ...newData,
      [name]: value,
    });
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
    setInfo([...info, newData])
    handleClose(); 
  setNewData({ id: 0, city: "", condition: "", degrees: "" });
  };

 

  return (
    <div>
      <h1>Weather Information</h1>
      <Button variant='outlined' onClick={handleOpen}>Add Widget</Button>
      
      <div>
            <FormControlLabel
                control={
                    <Switch checked={isCelsius} onChange={temperatureChange} />
                }
                label="Fahrenheit to Celsius "
            />
        </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
      component="form"
      onSubmit={handleSubmit}
      sx={style}
    >
      <TextField
          id="outlined-number"
          name="id"
          label="Number"
          type="number"
          value={newData.id}
        onChange={handleChange}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      <TextField
        label="Name"
        name="city"
        value={newData.city}
        onChange={handleChange}
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Condition"
        name="condition"
        value={newData.condition}
        onChange={handleChange}
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Degrees"
        name="degrees"
        value={newData.degrees}
        onChange={handleChange}
        required
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary" >
        Submit
      </Button>
      </Box>
      </Modal>
      <Grid container spacing={2} sx={{ padding: 2 }} flexDirection={"row"}>
      {
        info.map(data => {
          if (data.id === undefined) return null; 
          return(
            <Widgets key={data.id} id={data.id ?? 0} city={data.city} condition = {data.condition} degrees = {data.degrees} />
          )
        })
      }
      </Grid>
      
    </div>
  )
}

export default Dashboard
