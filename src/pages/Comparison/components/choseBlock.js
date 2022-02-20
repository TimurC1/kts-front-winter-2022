import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Columns from "./columns";

const useStyles = makeStyles((theme) => ({
    graph: {
        fontSize: "5px",
        color: "#f00",
    },
}));

export default function Choose(props) {

    Choose.propTypes = {
        color: PropTypes.string
    };

    const classes = useStyles();

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
        <div style={{ width: "48%" }}>
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

            <Columns color={props.color} className={classes.graph} coutryData={current}/>
        </div>
    );
}