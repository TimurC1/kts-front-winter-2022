import PropTypes from "prop-types";
import React, {useMemo} from "react"

import { Chart } from "react-charts"

export default function ChartComponent (props) {

    ChartComponent.propTypes = {
        daysData: PropTypes.array
    };

    let currentData = [[0, 0],[0, 0],[0, 0]];
    if (props.daysData){
        currentData = props.daysData;
    }

    const data = useMemo(
        () => [
            {
                label: "Выздоравления",
                data: currentData[1]
            },
            {
                label: "Смерти",
                data: currentData[2]
            },
            {
                label: "Заражения",
                data: currentData[0]
            }
        ],
        [currentData]
    )

    const series = useMemo(
        () => ({
            type: "bar"
        }),
        []
    )

    const axes = useMemo(
        () => [
            { primary: true, type: "ordinal", position: "left" },
            { position: "bottom", type: "linear", stacked: true, color: "white"}
        ],
        []
    )

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <Chart key={props.daysData}
                data={data} series={series} axes={axes} tooltip />
        </div>
    )
}