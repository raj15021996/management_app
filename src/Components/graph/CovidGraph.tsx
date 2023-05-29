import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    Filler,
    PointElement,
    LineElement,
} from 'chart.js';
//use for accessing chart.js features
ChartJS.register(
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler
);
//types 
interface CasesData {
    cases: {
        [date: string]: number;
    };
    deaths: {
        [date: string]: number;
    };
    recovered: {
        [date: string]: number;
    };
}

function CovidGraph(): JSX.Element {
    const [casesData, setCasesData] = useState<CasesData>({ cases: {}, deaths: {}, recovered: {} });

    //get data for creating graph
    const fetchGraphData = async () => {
        try {
            const response = await axios.get<CasesData>(
                'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
            );
            const data = response.data;
            setCasesData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    //call fetchGraphData at mounting of component
    useEffect(() => {
        fetchGraphData();
    }, []);

    const getingChartData = (): ChartData => {
        const cases = casesData?.cases || {};
        const labels = Object.keys(cases); //x-axis labels for graph 
        const data = Object.values(cases);

        const deaths = casesData?.deaths || {};
        const deathData = Object.values(deaths);

        const recovers = casesData?.recovered || {};
        const recoversData = Object.values(recovers);

        const formattedLabels = labels.map((dateStr) => {
            const date = new Date(dateStr);
            return date.toLocaleDateString(); // Format the date label as desired
        });

        return {
            labels: formattedLabels,
            datasets: [
                {
                    label: 'COVID-19 Cases',
                    data: data,
                    fill: false,
                    borderColor: 'yellow',

                },
                {
                    label: 'COVID-19 Death Cases',
                    data: deathData,
                    fill: false,
                    borderColor: 'red',

                },
                {
                    label: 'COVID-19 Recover Cases',
                    data: recoversData,
                    fill: false,
                    borderColor: 'green',

                },
            ],
        };
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 14
                    }
                }
            }
        },
    };
    const chartData: ChartData = getingChartData();
    return <Line data={chartData as any} options={options} />;
}

export default CovidGraph;
