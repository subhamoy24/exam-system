import { useState, useEffect, useRef} from 'react';
import Header from '../../components/admin/Header';
import axios from 'axios';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';



function TestCard({test}) {

  const router = useRouter();

  return(
   
      <Box sx={{ display: 'flex', margin: "24px", boxShadow: "0px -5px 10px 0px rgba(0, 0, 0, 0.5)", borderRadius: "10px" }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", width: "75%" }}>
          <Typography component="div" variant="h5">
          <div dangerouslySetInnerHTML={{ __html: test.name }} />
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          <div dangerouslySetInnerHTML={{ __html: test.description }} />
          </Typography>
        </CardContent>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "25%"}}>
        <Button variant='contained' onClick={() => { router.push(`/test/authorization/${test.id}`)}}>start</Button>
        </div>
      </Box>
  )
}
export default function Dashboard() {
  const [user, setUser ] = useState(null);
  const [tests, setTests] = useState(null);

  useEffect(() =>{
    let p = sessionStorage.getItem("user");
    console.log(p);
    p = JSON.parse(p);
    console.log(p);
    setUser(p);

    axios.get('http://localhost:5000/api/test/').then(
      (res) => {
        console.log(res.data)
        setTests(res.data)
      }
    ).catch(
      (err) => {

      }
    )
  },[]);

    return (
      <>
      <Header/>
      <Box sx={{ display: 'flex', flexDirection: "column", marginTop: "64px"}}>
        <h1>dashboard</h1>
      

      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      { tests && tests.map((test) => (
        <TestCard test={test} />
      ))}
      </Box>
      </>
    )
}
