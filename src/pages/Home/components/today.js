import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles((theme) => ({
    table: {
        marginTop: "30px"
    },
}));

export default function Today(props) {

    const classes = useStyles();

    Today.propTypes = {
        coutryData: PropTypes.object,
    };

    return (
        <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Смерти сегодня</TableCell>
                        <TableCell align="center">Случаи сегодня</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="center">{props.coutryData.total_new_deaths_today}</TableCell>
                        <TableCell align="center">{props.coutryData.total_new_cases_today}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
