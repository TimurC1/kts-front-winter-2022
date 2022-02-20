import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {getCountryStatistics} from "utils/apiService";
import Chart from "./chart";
import MapChart from "./mapChart";
import PieChart from "./pieChart";
import Today from "./today";


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        marginBottom: "30px",
    },
    map: {
        margin: "0",
        padding: "0 1.5rem",
    },
}));

export default function Content() {
    const classes = useStyles();
    const [casesData, setCasesData] = useState([]);

    useEffect(()=>{
        (async () => {
            const countriesRawData = await getCountryStatistics();
            const newCasesData = Object.values(countriesRawData)
                .map((countryRawData)=>{
                    return {
                        countryCode: countryRawData.code,
                        value: countryRawData.total_new_cases_today,
                    };
                });
            setCasesData(newCasesData);
        })();
    }, []);

    const [data, setData] = useState([{title: "Загрузка"}]);
    const [nameOfCounties, setNameOfCounties] = useState(["Загрузка"]);

    const [value, setValue] = useState({title: "Russia"});

    const [current, setCurrent] = useState({
        "ourid":191,
        "title":"Russia",
        "total_cases": 917884,
        "total_deaths": 15617,
        "total_new_cases_today": 5061,
        "total_new_deaths_today": 119,
        "total_recovered": 729411,
        "total_active_cases": 6447,
        "total_serious_cases": 172856
    });

    useEffect(() => {
        axios.get("https://api.thevirustracker.com/free-api?countryTotals=ALL")
            .then(result => {

                const countries = [];
                for (const key in result.data.countryitems[0]) {
                    if (result.data.countryitems[0].hasOwnProperty(key)) {
                        countries.push(result.data.countryitems[0][key]);
                    }
                }
                setData(countries);
            }).finally(() => {

            });
    }, []);

    useEffect(() => {
        const current = data.map((option) => option.title).slice(0, 181);
        setNameOfCounties(current);
    }, [data]);

    useEffect(() => {
        for (const key in data) {
            if (data.hasOwnProperty(key))  {
                if (data[key].title === value.title)
                    setCurrent(data[key]);
            }
        }
    }, [value, data]);

    return (
        <>
            <Paper className={classes.paper}>
                <Typography>Новые случаи в мире сегодня</Typography>
                <MapChart countriesData={casesData} className={classes.map} />
            </Paper>

            <Paper className={classes.paper}>
                <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={nameOfCounties}
                    value={value}
                    onChange={(event, newValue) => {
                        if (typeof newValue === "string") {
                            setValue({
                                title: newValue,
                            });
                        } else if (newValue && newValue.inputValue) {
                            // Create a new value from the user input
                            setValue({
                                title: newValue.inputValue,
                            });
                        } else {
                            setValue({title: "Russia"});
                        }
                    }}

                    getOptionLabel={(option) => {
                        if (typeof option === "string") {
                            return option;
                        }
                        if (option.inputValue) {
                            return option.inputValue;
                        }
                        return option.title;
                    }}

                    renderInput={(params) => (
                        <TextField {...params} label="Выбор страны" margin="normal" variant="outlined" />
                    )}
                />
            </Paper>

            <Paper className={classes.paper}>
                <Typography>Подробная статистика</Typography>
                <Chart coutryData={current}/>
            </Paper>

            <Paper className={classes.paper}>
                <Typography>Сегодня</Typography>
                <Today coutryData={current}/>
            </Paper>

            <Paper className={classes.paper}>
                <Typography>Соотношение</Typography>
                <PieChart coutryData={current}/>
            </Paper>
        </>
    );
}