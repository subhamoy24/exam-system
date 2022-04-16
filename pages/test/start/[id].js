import { useState, useEffect, useRef} from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Link from '@mui/material/Link';
import { useTheme } from '@emotion/react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle'
import { mainListItems, secondaryListItems } from '../../../components/listItems';
import Button from '@mui/material/Button';
import { ContactSupport } from '@mui/icons-material';
import { useRouter } from 'next/router';

const UnRespondendQuestion = styled('button')({
  background: 'transparent',
  borderRadius: '3px',
  border: '2px solid blue',
  color: 'blue',
  margin: '0 1em',
  padding: '1em 1em'
})

const RespondendQuestion = styled('button')({
  backgroundColor: 'blue',
  borderRadius: '3px',
  border: 'none',
  color: 'white',
  margin: '0 1em',
  padding: '1em 1em'
})


const drawerWidth = 300;

/*const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

/*const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);*/

const mdTheme = createTheme();

/*function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} content="header">
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} content="main">
           
            <Grid item xs={12}>
              <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column' }}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Badge badgeContent={1} color="success"/>
                  </ListItemIcon>
                  <ListItemText>
                    loem jbfdjkbfdb gjbdljgbfljgviarifhdsi  ghsilfghrisgjrsighiarhiarglkdagjda gjdbgljdagljdahglkadh glkahdlghladgh adfjsgbjrghi lsfhg;orghir gjisfglfgkfsklgs fskghfslglf hgkfghrhrglrslbljblv jbfsljgbfbggfhglkhfs lkghlfghri shgikfhlghfghif gihsihgidhgifj gih
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Answer</FormLabel>
                    <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    >
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                  </FormControl>
                </ListItem>

              </List>
              </Paper>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
              <Button variant='contained' sx={{ mt: 3,  display: "block", mr: 2 }}>Back</Button>
              <Button variant='contained' sx={{ mt: 3, display: "block"}}>Next</Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}*/
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Exam() {
  const theme = useTheme();
  const router = useRouter();
  const { id,userId } = router.query;

  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedResponse, setSelectedResponse] = useState([]);
  const [remainingTime, setRemainingTime] = useState(null);
  const [testAttemptId, setTestAttemptId] = useState(null);
  const [ timer, setTimer] = useState("00:00:00");
  const intervalRef = useRef(null);
  const [dialog, setDialog] = useState(false);
  const [user, setUser] = useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const updateTimer = (e, testId) => {
    const remaining = Date.parse(e) -  Date.parse(new Date());

    const seconds = Math.floor((remaining/1000)%60);
    const minutes = Math.floor((remaining/(1000*60))%60);
    const hours = Math.floor((remaining/(1000*60*60))%60);
    const str = (hours <=9 ? "0"+hours : hours) + ":" + (minutes<=9 ? "0"+minutes : minutes) + ":" + (seconds<=9 ? "0"+seconds : seconds);
    setTimer(str)
    //console.log(testAttedata.data.testAttempt.idmptId+"]");
    if(remaining == 0){
      clearInterval(intervalRef.current);
      setDialog(true);
      //console.log(testAttemptId+"pp");
      
        axios.post(`http://localhost:5000/api/test/${testId}/submit`).then(
        (res) => {
          if(res.data == "ok"){
            router.push('/end-test')
          }
        }
      ).catch(
        (err) => {
          console.log("stop")
        }
      )
    }

    setRemainingTime(Math.floor(remaining/1000))

  }

  const getDeadTime = (e) => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds()+e);
    return deadline
  }

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOptionChange = (event) =>{
    console.log(selectedResponse);
    console.log(event.target.value)
    console.log(selectedResponse[questions.index] == event.target.value)
    if(selectedResponse[questions.index] == event.target.value){
      selectedResponse[questions.index] = ''
    }else{
      selectedResponse[questions.index] = event.target.value
    }

    setSelectedResponse([...selectedResponse])
  }
  
  const saveResponse = async () =>{
    const path = `http://localhost:5000/api/test/${testAttemptId}/save-response`;
    let response = ""
    if(selectedResponse[questions.index] != ""){
      response = `[${selectedResponse[questions.index]}]`;
    }
    const data = {
      userId: 1,
      questionId: questions.questions[questions.index].id,
      response: response
    }
    axios.post(path, data).then(
      (res) => {
        const y = (questions.index+1)%questions.questions.length;
        setQuestions((prevState) => { return {...prevState, index: y}});
      }
    )
  }

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    console.log(userData);
    if(!userData){
      router.push('/login');
    }
    setUser(JSON.parse(userData));
  }, [])

  useEffect(async () => {
    if(user){
      const path = `http://localhost:5000/api/test/${id}/questions?userId=${user.id}`;
      const data = await axios.get(path);
      console.log(data.data)
      setRemainingTime(data.data.testAttempt.timeRemaining)
      setTestAttemptId(data.data.testAttempt.id);
      const responses = data.data.responses;
      const m = responses.map((r) => {
        if(r === ''){
          return ''
        }else{
          return JSON.parse(r)[0];
        }
      })
      //console.log(m)
      setSelectedResponse(m);
      setQuestions({ questions: data.data.questions, index: 0});
      const deadline = getDeadTime(data.data.testAttempt.timeRemaining);
      console.log(deadline);
      const timerId = setInterval(() =>{
        updateTimer(deadline, data.data.testAttempt.id)
      }, 1000);
      intervalRef.current = timerId;
    }
  }, [user])

  const QuestionNumber = ({index}) => {
    if(selectedResponse.length > 0 && selectedResponse[index] !== ''){
      return(<RespondendQuestion>{index+1}</RespondendQuestion>)
    }else{
      return(<UnRespondendQuestion>{index+1}</UnRespondendQuestion>)
    }
  }

 useEffect(async () =>{
    console.log(testAttemptId+"[");
    if(remainingTime !== null){
      if(testAttemptId){
        await axios.post(`http://localhost:5000/api/test/${testAttemptId}/restore-time`, {
        time: remainingTime
      }).then((res) =>{
        console.log(res)
      });
      }
    }
  },[remainingTime])

  if(questions){ 

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>

          <Typography variant='h5' noWrap component="div">
            {timer}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
           <ChevronLeftIcon /> 
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List component="nav">
        
        {[...Array(questions.questions.length)].map((x,i) =>  <QuestionNumber index={i}/>)}
        
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} content="main">
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column' }}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Badge badgeContent={questions.index+1} color="success"/>
                  </ListItemIcon>
                  <ListItemText>
                    {<div dangerouslySetInnerHTML={{ __html: questions.questions[questions.index].description }} />}
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Answer</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                      value={selectedResponse[questions.index]}
                    >
                      { questions.questions[questions.index].Options.map((op) => {
                        return (<FormControlLabel value={op.id} control={<Radio  onClick={handleOptionChange}/>} label={op.value} />)
                      })}
                    </RadioGroup>
                  </FormControl>
                </ListItem>

              </List>
              </Paper>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
              {questions.index > 0 ?
               <Button variant='contained' sx={{ mt: 3,  display: "block", mr: 2 }}>Back</Button> : ""}
              <Button variant='contained' sx={{ mt: 3, display: "block"}} onClick={saveResponse}>Next</Button>
            </Box>
          </Container>
          <Dialog open={dialog}>
            <DialogTitle>...Wait a while</DialogTitle>
          </Dialog>
        </Box>
      </Main>
    </Box>);
  }else{
    return ("loading...")
  }
}