import React, { Component } from 'react';
import { Grid, Box, Avatar, Typography, Chip, IconButton, Divider, Switch, Stack, Card } from '@mui/material';
import { LocationOn, Edit } from '@mui/icons-material';
import { useRouter } from 'next/router';
const Item = () => {

  const router = useRouter();
  const handlerClick = () =>{
    router.push('/test')
    
  }

  return(
    <Card>
      <Box sx={{ p: 2, display: 'flex', justifyContent: "space-between"}}>
        <Box sx={{ display: 'flex'}}>
          <Avatar variant="rounded" src="avatar1.jpg" />
          <Stack spacing={0.5} ml={1}>
            <Typography fontWeight={700}>Michael Scott</Typography>
            <Typography variant="body2" color="text.secondary">
              <LocationOn/>Scranton, PA
            </Typography>
          </Stack>
        </Box>
        <IconButton>
          <Edit sx={{ fontSize: 25 }} />
        </IconButton>
      </Box>
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 2, py: 1, bgcolor: 'background.default' }}>
        <Chip label="Inactive account" onClick={handlerClick}></Chip>
      </Stack>
    </Card>
  )
}
class ExamList extends Component {
  constructor() {
    super()
  }
  
  render() {
    return (
      <div>
          <Grid container spacing={24} style={{padding: 24}}>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Item/>
            </Grid>

            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Item/>
            </Grid>

            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Item/>
            </Grid>

            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Item/>
            </Grid>
          </Grid>
      </div>
    )
  }
}
export default ExamList;