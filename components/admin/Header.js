import { AppBar, Toolbar, Typography } from "@mui/material"

export default function Header(){
  const drawerWidth = 240;
  return(
  <AppBar position="fixed" sx={{ width: "100%", ml: `${drawerWidth}px` }}>
    <Toolbar>
      <Typography variant="h6" noWrap component="div">
        Permanent drawer
      </Typography>
    </Toolbar>
  </AppBar>)
}