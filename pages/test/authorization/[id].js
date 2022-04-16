import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Header from '../../../components/admin/Header'
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

export default function Authorization() {
  let router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Header/>
      <Typography variant="h6" gutterBottom sx={{textAlign: "center", padding: "30px", marginTop: "80px"}}>
        Terms&Condition
      </Typography>
      <Grid container spacing={3} sx={{ margin:"20px 100px 0px 100px"}}>
        jjfhjkfhdjksfsdkfkkyfjgfgjfjgh
      </Grid>
      <Button variant='contained' onClick={() => { router.push(`/test/start/${id}`)}}>Start</Button>
    </>
  );
}
