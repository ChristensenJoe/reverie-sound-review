import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, AppBar, Toolbar, Typography, Button, Divider } from '@material-ui/core';
import rev from '../images/rev.png'
import userImage from "../images/profile-image-placeholder.png"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));

export default function ButtonAppBar({user}) {
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
          <img src={rev} height="5%" width="5%" alt='logo'></img>
          <Typography variant="h6" className={classes.title}>

          </Typography>
          <Button
            color="inherit"
            component={NavLink}
            to="/dashboard"
            style={linkStyles}
            activeStyle={activeLinkStyles}
          >Dashboard
          </Button>
          <Button
            component={NavLink}
            to="/news"
            style={linkStyles}
            color="inherit"
            activeStyle={activeLinkStyles}
          >News
          </Button>
          <Button
            component={NavLink}
            to="/forums"
            style={linkStyles}
            color="inherit"
            activeStyle={activeLinkStyles}
          >Forums
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button
            color="inherit"
            component={NavLink}
            to="/settings"
            style={linkStyles}
            activeStyle={activeLinkStyles}
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
