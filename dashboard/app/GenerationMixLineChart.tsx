'use client';

import { useState, useEffect } from 'react';
import { Card, Title, LineChart } from "@tremor/react";
import dayjs from 'dayjs';

export default function GenerationMixLineChart() {
    const [chartdata, setChartdata] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://api.tinybird.co/v0/pipes/generation_mix_api.json?token=p.eyJ1IjogIjc4ZmVhOGY5LTkzNzYtNDQzMC1iNTUwLTA0YTU5MWM2ZTFjZSIsICJpZCI6ICJiYWFhZWNiYy1kMjk0LTQyM2QtOTc0Ny1lZjBiNDQyMDFmYTMifQ.wkD8QpT_oXE5UqEB92a9APCZOhBx_mN92PpWu3lkMQI');
            const { data } = await res.json();
            setChartdata(data)
        }
        fetchData();
    }, []);

    return (
        <Card>
            <LineChart
                dataKey="time_from"
                data={chartdata}
                categories={["coal", "gas", "biomass", "hydro", "imports", "nuclear", "solar", "other", "wind"]}
                colors={["blue"]}
                // valueFormatter={dataFormatter}
                marginTop="mt-6"
                yAxisWidth="w-10"
            />
        </Card>
    )
};