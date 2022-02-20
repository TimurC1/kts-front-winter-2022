import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, {useEffect, useRef, useState} from "react";

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";


const useStyles = makeStyles((theme) => ({
    table: {
        marginTop: "30px"
    },
}));


export const useContainerDimensions = myRef => {
    const getDimensions = () => ({
        width: myRef.current.offsetWidth,
        height: myRef.current.offsetHeight
    })

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    useEffect(() => {
        const handleResize = () => {
            setDimensions(getDimensions())
        }

        if (myRef.current) {
            setDimensions(getDimensions())
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [myRef])

    return dimensions;
};

export default function Chart(props) {
    const classes = useStyles();

    Chart.propTypes = {
        coutryData: PropTypes.object,
        color: PropTypes.string
    };

    const data = [
        {
            name: "Случаи",
            people: props.coutryData.total_cases,
        },
        {
            name: "Выздоровления",
            people: props.coutryData.total_recovered
        },
    ];

    const componentRef = useRef()
    const { width } = useContainerDimensions(componentRef);

    return (
        <div ref={componentRef}>
            <BarChart strokeDasharray="3 3"
                key={props.coutryData.ourid}
                width={width}
                height={300}
                data={data}
                margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="people" stackId="a" fill={props.color} />
            </BarChart>

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