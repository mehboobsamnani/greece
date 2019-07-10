import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import './account.scss'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  container :{
    margin:'auto'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [phoneNumber,SetphoneNumber] = useState();

  return (
    <Container className={classes.container} component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="companyName"
                name="Companyname"
                variant="outlined"
                fullWidth
                id="companyName"
                label="Company name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="name"
                name="Contact Name"
                variant="outlined"
                fullWidth
                id="name"
                label="Contact Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="sita"
                name="sita"
                variant="outlined"
                fullWidth
                id="sita"
                label="SITA"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={2}>
            <TextField
                autoComplete="country-code"
                name="sita"
                variant="outlined"
                fullWidth
                id="sita"
                label="Code"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                autoComplete="phonenumber"
                name="sita"
                variant="outlined"
                fullWidth
                id="sita"
                label="Phone"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="Address"
                label="Address"
                type="text"
                id="Address"
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
     
    </Container>
  );
}