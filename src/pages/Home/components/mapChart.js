import {scaleLinear} from "d3-scale";
import PropTypes from "prop-types";
import React from "react";
import {
    ComposableMap,
    Sphere,
    Graticule,
    ZoomableGroup,
    Geographies,
    Geography,
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";


const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = (num) => {
    if (num > 1e9) {
        return Math.round(num / 1e8) / 10 + "Bn";
    }
    if (num > 1e6) {
        return Math.round(num / 1e5) / 10 + "M";
    }
    if (num > 100) {
        return Math.round(num / 100) / 10 + "K";
    }
    return num;
};

export default class MapChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tooltipLabel: ""}
    }

    static propTypes = {
        countriesData: PropTypes.arrayOf(PropTypes.shape({
            countryCode: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
        })),
        tooltipLabel: PropTypes.string
    }

    static defaultProps = {
        countriesData: [],
        tooltipLabel: ""
    }

    render() {
        const countriesData = this.props.countriesData;

        const allCountriesValues = countriesData.map(((countryData) => countryData.value));
        const maxValue = Math.max(...allCountriesValues);
        const minValue = Math.min(...allCountriesValues);

        const colorScale = scaleLinear()
            .domain([minValue, maxValue])
            .range(["#ffedea", "#ff5233"]);

        const height = 1200;
        const width = 2400
        const scale = 400;

        return (
            <>
                <ComposableMap data-tip="" width={width} height={height} projectionConfig={{scale: scale}}>
                    <ZoomableGroup translateExtent={[[0, 0], [width, height]]}>
                        <Sphere stroke="#DDD"/>
                        <Graticule stroke="#DDD"/>
                        <Geographies geography={geoUrl}>
                            {({geographies}) =>
                                geographies.map((geo) => {
                                    const countryData = countriesData.find(
                                        (country) => country.countryCode === geo.properties.ISO_A2
                                    );

                                    const color = countryData ? colorScale(countryData.value) : "#D6D6DA";

                                    return <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onMouseEnter={() => {
                                            const {NAME} = geo.properties;
                                            const newTooltipLabel =
                                                `${NAME} — ${countryData ? rounded(countryData.value) : "N/A"}`;
                                            this.setState({tooltipLabel: newTooltipLabel})
                                        }}
                                        onMouseLeave={() => this.setState({tooltipLabel: ""})}
                                        style={{
                                            default: {
                                                fill: color,
                                                outline: "none",
                                                stroke: "#b1b1b1",
                                                strokeWidth: 0.5,
                                                transition: "500ms",
                                            },
                                            hover: {
                                                fill: "#e4e4e4",
                                                outline: "none",
                                                stroke: "#b1b1b1",
                                                strokeWidth: 0.5,
                                                transition: "500ms",
                                            },
                                            pressed: {
                                                fill: "#e4e4e4",
                                                outline: "none",
                                            },
                                        }}
                                    />;
                                })
                            }
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
                <ReactTooltip>{this.state.tooltipLabel}</ReactTooltip>
            </>
        );
    }
};
