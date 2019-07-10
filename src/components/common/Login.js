import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";

const API = `${process.env.REACT_APP_API_URL}User/Auth`;

const useStyles = makeStyles(theme => ({
  popoverCont: {
    padding: theme.spacing(2),
    paddingTop: 0
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },

  headerActions: {
    "& button": {
      color: "white",
      borderColor: "white",
      marginLeft: theme.spacing(2)
    }
  }
}));

export default function Login() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState("test");
  const [password, setPassword] = useState("password");
  const [signState, setSignState] = useState(!!localStorage.token);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  function loginFunc() {
    let payload = { UserName: username, Password: password };
    fetch(API, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(payload), // data can be `string` or {object}!
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(json => {
        if (json.statusCode === 200) {
          console.log("Login successfull");
          localStorage.token = json.result;
          setSignState(true);
          setAnchorEl(null);
        } else if (json.statusCode === 204) {
          console.log("Username password do not match");
        } else {
          console.log("Username does not exists");
        }
      });
  }

  function handleSignOut(e) {
    setSignState(false);
    delete localStorage.token;
  }

  return (
    <div className={classes.headerActions}>
      {!signState ? (
        <>
          <Button
            aria-describedby={id}
            variant="outlined"
            onClick={e => setAnchorEl(e.currentTarget)}
          >
            <Icon className={classes.extendedIcon}>account_circle</Icon> SignIn
          </Button>
          <Button variant="outlined">
            <Icon className={classes.extendedIcon}>lock_open</Icon> Register{" "}
          </Button>
        </>
      ) : (
        <Button
          aria-describedby={id}
          variant="outlined"
          onClick={handleSignOut}
        >
          {" "}
          SignOut{" "}
        </Button>
      )}
      <Button variant="outlined">
        <Icon>menu</Icon>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <div className={classes.popoverCont}>
          <TextField
            label="Username"
            value={username}
            margin="normal"
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            id="standard-password-input"
            label="Password"
            className={classes.textField}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            margin="normal"
          />
          <br />
          <Button variant="contained" color="primary" onClick={loginFunc}>
            {" "}
            SignIn
          </Button>
        </div>
      </Popover>
    </div>
  );
}
