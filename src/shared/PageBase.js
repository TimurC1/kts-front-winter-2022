import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import Header from "./components/header";
import LeftBar from "./components/leftBar";

const useStyles = makeStyles((theme) => ({
    container: {
        marginLeft: "3%",
        marginRight: "3%"
    },
    content: {
        marginTop: "30px",
    },
    menu: {
        width: "100%",
        position: "fixed"
    },
    block: {
        marginTop: "80px",
    }
}));


function PageBase(props) {
    const classes = useStyles();

    return (
        <>
            <Header/>
            <div className={classes.container}>
                <div className={classes.block}>
                    <LeftBar className={classes.menu} />
                </div>
                <div className={classes.content}>
                    {props?.children}
                </div>
            </div>
        </>
    )
}

PageBase.propTypes = {
    children: PropTypes.node.isRequired
};

export default PageBase;