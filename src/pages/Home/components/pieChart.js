import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import {PieChart} from "react-minimal-pie-chart";

const useStyles = makeStyles((theme) => ({
    container: {
        height: "300px",
    },
    table: {
        marginTop: "30px"
    },
}));

export default function MyPieChart(props) {
    const classes = useStyles();

    MyPieChart.propTypes = {
        coutryData: PropTypes.object,
    };

    const data = [
        {title: "Выздоровевших", value: props.coutryData.total_recovered, color: "#51d0de"},
        {title: "Серьезных случаев", value: props.coutryData.total_serious_cases, color: "#791e94"},
    ]

    return (
        <div>
            <PieChart className={classes.container}
                label={(data) => data.dataEntry.title}
                labelStyle={{
                    fontSize: "4px",
                }}
                key={props.coutryData.ourid}
                data={data}
            />
            <TableContainer className={classes.table} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Выздоровевших</TableCell>
                            <TableCell align="center">Серьезных случаев</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center">{props.coutryData.total_recovered}</TableCell>
                            <TableCell align="center">{props.coutryData.total_serious_cases}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
