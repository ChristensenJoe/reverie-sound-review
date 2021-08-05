import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, AppBar, Toolbar, Typography, Button, Divider } from '@material-ui/core';
import navlogo2 from '../images/navlogo2.png'
import userImage from "../images/profile-image-placeholder.png"


export default function ButtonAppBar({user}) {
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    btn: {
      '&:hover':  {
        background: "#ff784e"
      }
    }
  }));

  const classes = useStyles();

  const linkStyles = {
    height: "62px",
    paddingRight: "10px",
    paddingLeft: "10px"
  }
  const activeLinkStyles = {
    backgroundColor: "#ff5722"
  }

  return (
    <div className={classes.root}>
      <AppBar style={{ background: "black" }} position="static" >
        <Toolbar>
          <img src={navlogo2} alt="logo" height="50px"></img>
          <Typography variant="body1" className={classes.title}>
              {/* <h1>Reverie Sound Review</h1> */}
          </Typography>
          <Button
            color="inherit"
            component={NavLink}
            to="/dashboard"
            style={linkStyles}
            activeStyle={activeLinkStyles}
            className={classes.btn}
          >Dashboard
          </Button>
          <Button
            component={NavLink}
            to="/news"
            style={linkStyles}
            color="inherit"
            activeStyle={activeLinkStyles}
            className={classes.btn}
          >News
          </Button>
          <Button
            component={NavLink}
            to="/forums"
            style={linkStyles}
            color="inherit"
            activeStyle={activeLinkStyles}
            className={classes.btn}
          >Forums
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button
            color="inherit"
            component={NavLink}
            to="/settings"
            style={linkStyles}
            activeStyle={activeLinkStyles}
            className={classes.btn}
          >
            <Box
              border={1}
              borderRadius="50%"
              overflow="hidden"
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="50px"
              width="50px"
            >
              <img
                style={{
                  width: "100%",
                  height: "auto"
                }}
                src={user.profileImage!=="" ? user.profileImage : userImage}
                alt="profile"
              />
            </Box>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
