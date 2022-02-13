import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        textAlign: "center",
    },
    link: {
        textDecoration: "none",
    },
}));

export default function LeftBar() {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <List component="nav" aria-label="secondary mailbox folders">
                <ListItem button component={NavLink} to="">
                    <ListItemText primary="Общая статистика"/>
                </ListItem>
                <ListItem button component={NavLink} to="compare">
                    <ListItemText primary="Сравнения"/>
                </ListItem>
                <ListItem button component={NavLink} to="history">
                    <ListItemText primary="История распространения"/>
                </ListItem>
            </List>
        </Paper>
    );
}
