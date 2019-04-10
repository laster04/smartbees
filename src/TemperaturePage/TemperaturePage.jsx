import React, {PureComponent} from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {Client} from 'elasticsearch';
const client = new Client({host: 'http://160.217.213.136:9502'});

const tempData = client.search({
    index: 'vcely2',
    body: {
        aggs: {
            2: {
                date_histogram: {
                    field: "time",
                    interval: "1m",
                    time_zone: "UTC",
                    min_doc_count: 1
                },
                aggs: {
                    3: {
                        terms: {
                            field: "desc",
                            size: 5,
                            order: {
                                1: "desc"
                            }
                        },
                        aggs: {
                            1: {
                                max: {
                                    field: "bees_t"
                                }
                            }
                        }
                    }
                }
            }
        },
        stored_fields: [
            "*"
        ],
        query: {
            bool: {
                must: [
                    {
                        match_all: {}
                    },
                    {
                        range: {
                            time: {
                                gte: 1554656279417,
                                lte: 1554659879417,
                                format: "epoch_millis"
                            }
                        }
                    }
                ]
            }
        }
    }
});
const data = [
    {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
];
class TemperaturePage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
        console.log(tempData);
    }

    componentDidMount() {
        console.log(this.props.match);
        this.setState({
            user: JSON.parse(localStorage.getItem('user'))
        });
    }

    render() {
        return (

            <LineChart
                width={800}
                height={700}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
        );
    }
}

export {TemperaturePage};