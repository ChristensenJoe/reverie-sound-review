import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, Divider } from '@material-ui/core';

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

export default function ButtonAppBar() {
  const classes = useStyles();

  const linkStyles = {
    height: "62px",
    paddingRight: "10px",
    paddingLeft: "10px"
  }
  const activeLinkStyles = {
    backgroundColor: "#274472"
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Reverie Sound Review
          </Typography>
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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
