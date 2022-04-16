import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function EducationalForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="CollegeName"
            label="Name of the college"
            fullWidth
            autoComplete="college name"
            variant="standard"
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="c-city"
            label="College city"
            helperText="Type College City"
            fullWidth
            autoComplete="College city"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
