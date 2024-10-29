import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  navLinks: {
    marginLeft: 'auto',
    display: 'flex',
    gap: '16px', // Manually set spacing value instead of using theme.spacing
  },
  linkButton: {
    color: '#ffffff',
    textDecoration: 'none',
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Personal Finance App</Typography>
        <div className={classes.navLinks}>
          <Button color="inherit" component={Link} to="/dashboard" className={classes.linkButton}>
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/transactions" className={classes.linkButton}>
            Transactions
          </Button>
          <Button color="inherit" component={Link} to="/budgets" className={classes.linkButton}>
            Budgets
          </Button>
          <Button color="inherit" component={Link} to="/goals" className={classes.linkButton}>
            Goals
          </Button>
          <Button color="inherit" component={Link} to="/reports" className={classes.linkButton}>
            Reports
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
