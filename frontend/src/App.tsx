/*import React from "react";
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MedRecs from "./components/MedRecs";
import MedRecCreate from "./components/MedRecCreate";
import Home from "./components/Home";


export default function App(){
    return (
      <Router>
        <div>
          <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/medication_records" component={MedRecs}/>
              <Route exact path="/create" component={MedRecCreate}/>
            </Switch>
          
        </div>
      </Router>
    );

}*/

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";

import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
//import YouTubeIcon from "@material-ui/icons/YouTube";
import MedicationIcon from '@mui/icons-material/Medication';
import NoteAltIcon from '@mui/icons-material/NoteAlt';

import Home from "./components/Home";
import Pharmacists from "./components/Pharmacists";
import PharmacistCreate from "./components/PharmacistCreate";
import MedRecs from "./components/MedRecs";
import MedRecCreate from "./components/MedRecCreate";
import SignIn from "./components/SignIn";

import { SigninInterface } from "./models/ISignin";
import { tokenToString } from "typescript";
import Navbar from "./components/Navbar";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    nav : {background : "#239B56"},
    title: {
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    a: {
      textDecoration: "none",
      color: "inherit",
    },
  })
);

export default function MiniDrawer() {
  
  const classes = useStyles();
 
  const [token, setToken] = React.useState<String>("");
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <SignIn />;
  }

 
  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        {token && (
          <>
          <Navbar />
          <main className={classes.content}>
          <div className={classes.toolbar} />
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/pharmacists" component={Pharmacists} />
              <Route exact path="/pharmacist/create" component={PharmacistCreate} />
              <Route exact path="/medication_records" component={MedRecs} />
              <Route
                exact
                path="/medication_record/create"
                component={MedRecCreate}
              />
            </Switch>
          </div>
        </main>
        </>
        )}

        
      </Router>
    </div>
  );
}