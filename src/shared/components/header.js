import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import { NavLink } from "react-router-dom";
import Info from "./info";
import "./header.css";

const useStyles = makeStyles((theme) => ({

    container: {
        paddingTop: "15px",
        paddingBottom: "15px",
        display: "flex",
        justifyContent: "space-around",
    },

    Typography: {
        flex: 1,
    },

    title: {
        textAlign: "center",
        textTransform: "uppercase",
    },

    link: {
        textDecoration: "none",
        color: "white",
    },
}));

export default function Header() {
    const classes = useStyles();
    return (
        <AppBar className={classes.appBar}>
            <div className={classes.container}>
                <div>
                    <NavLink className={classes.link} to="/">
                        <Typography>inFrontOfYou</Typography>
                    </NavLink>
                </div>
                <div className="menu-items">
                    <Typography className={classes.title}>Статистика пандемии коронавируса</Typography>
                </div>
                <div className="menu-items">
                    <Info />
                </div>
            </div>
        </AppBar>
    );
}
