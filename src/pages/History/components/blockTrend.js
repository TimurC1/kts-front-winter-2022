import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Theats from "../../Home/components/threats";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginBottom: "30px",
    },
    paperGraph: {
        height: "500px",
    },
}));

export default function BlockTrend() {
    const classes = useStyles();

    const [data, setData] = useState([[0, 0],[0, 0],[0, 0]]);

    useEffect(() => {
        axios.get("https://api.thevirustracker.com/free-api?countryTimeline=RU")
            .then(result => {
                const buffer = [];

                const dataTotalCases = [];
                const totalRecoveries = [];
                const dataDeaths = [];

                let flag = false;
                for (const key in result.data.timelineitems[0]) {
                    if (result.data.timelineitems[0].hasOwnProperty(key)) {
                        if (key === "9/01/20") flag = true;

                        if (flag && key !== "stat") {
                            const current = result.data.timelineitems[0][key];

                            dataTotalCases.push([key, current.total_cases]);
                            totalRecoveries.push([key, current.total_recoveries]);
                            dataDeaths.push([key, current.total_deaths]);
                        }
                    }
                }
                buffer.push(dataTotalCases, totalRecoveries, dataDeaths);
                setData(buffer);
            }).finally(() => {

            });
    }, []);

    return (
        <Card className={classes.paper} variant="outlined">
            <CardContent>
                <Typography>История распространения в Росии</Typography>
            </CardContent>
            <CardContent className={classes.paperGraph}>
                <Theats key={data} daysData={data} />
            </CardContent>
        </Card>
    );
}