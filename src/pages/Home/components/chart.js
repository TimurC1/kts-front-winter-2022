import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import {ChartComponent} from "bar-chart-simple";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles((theme) => ({
    table: {
        marginTop: "30px"
    },
}));

export default function Chart(props) {
    const classes = useStyles();

    Chart.propTypes = {
        coutryData: PropTypes.object,
        color: PropTypes.string
    };

    const data = [
        {
            data_category: "Случаи",
            data_value: props.coutryData.total_cases,
        },
        {
            data_category: "Позитив",
            data_value: props.coutryData.total_recovered,
        }
    ];

    return (
        <div>
            <ChartComponent
                key={props.coutryData.ourid}
                data={data}
                chart_type="bar_chart" />

            <TableContainer className={classes.table} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Смерти</TableCell>
                            <TableCell align="center">Смерти сегодня</TableCell>
                            <TableCell align="center">Случаи сегодня</TableCell>
                            <TableCell align="center">Актуальные случаи</TableCell>
                            <TableCell align="center">Серьезные случаи</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center">{props.coutryData.total_deaths}</TableCell>
                            <TableCell align="center">{props.coutryData.total_new_deaths_today}</TableCell>
                            <TableCell align="center">{props.coutryData.total_new_cases_today}</TableCell>
                            <TableCell align="center">{props.coutryData.total_active_cases}</TableCell>
                            <TableCell align="center">{props.coutryData.total_serious_cases}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}