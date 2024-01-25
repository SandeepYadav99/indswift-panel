import React, { useEffect, useRef } from "react";
import { Grid, Select, MenuItem, Input, withStyles, Typography } from "@material-ui/core";
import { ArrowForward as ArrowForwardIcon } from "@material-ui/icons";
import { Line } from 'react-chartjs-2';

import Widget from "../../../../components/Widget/WidgetView";

const getRandomData = () =>
    Array(7)?.fill()?.map(() => ({ value: Math.floor(Math.random() * 10) + 1 }));

const LineStat = ({ theme, classes, data }) => {
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    reverse: false,
                    stepSize: 500000
                },
            }]
        },
        bezierCurve: true,
        elements: {
            line: {
                tension: 100
            }
        },
        legend: {
            display: false
        },
        tooltips: {
            backgroundColor: "rgba(255, 255, 255,0.9)",
            titleFontColor: '#000',
            bodyFontColor: '#000',
            callbacks: {
                label: function (tooltipItem) {
                    return tooltipItem.yLabel;
                }
            }
        },
    };

    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const { datasets } = chartRef.current.chartInstance.data;
            console.log(datasets[0].data);
        }
    }, [data]);

    const getData = (canvas) => {
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(88,80,236,0.2)');
        gradient.addColorStop(1, 'rgba(88,80,236,0)');

        return {
            labels: data?.map((val) => val.date),
            datasets: [
                {
                    label: 'My First dataset',
                    fill: true,
                    lineTension: 0.3,
                    height: 200,
                    backgroundColor: gradient,
                    borderColor: '#5850EC',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#fff',
                    pointBackgroundColor: '#5850EC',
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#5850EC',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 7,
                    pointHitRadius: 10,
                    data: data?.map((val) => val.count)
                }
            ],
        };
    };

    return (
        <Widget
            header={
                <div className={classes.title}>
                    {/* <Typography variant="h5">Weekly Data</Typography> */}
                </div>
            }
            upperTitle
        >
            <Line ref={chartRef} data={getData} options={options} height={80} />
        </Widget>
    );
};

const styles = theme => ({
    title: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "600px",
        marginBottom: theme.spacing.unit
    },
    bottomStatsContainer: {
        display: "flex",
        justifyContent: "space-between",
        margin: theme.spacing.unit * -2,
        marginTop: theme.spacing.unit
    },
    statCell: {
        padding: theme.spacing.unit * 2
    },
    totalValueContainer: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between"
    },
    totalValue: {
        display: "flex",
        alignItems: "baseline"
    },
    profitArrow: {
        transform: "rotate(-45deg)",
        fill: theme.palette.success.main
    },
    profitArrowDanger: {
        transform: "rotate(45deg)",
        fill: theme.palette.secondary.main
    },
    selectInput: {
        padding: 10,
        paddingRight: 25,
        "&:focus": {
            backgroundColor: "white"
        }
    }
});

export default withStyles(styles, { withTheme: true })(LineStat);
