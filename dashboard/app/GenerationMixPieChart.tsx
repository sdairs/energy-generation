'use client';

import { useState, useEffect } from 'react';
import { Card, DonutChart, Title, Color } from '@tremor/react';


const categoryColorMap: Record<string, Color> = {
    coal: "zinc",
    gas: "slate",
    hydro: "lime",
    solar: "green",
    wind: "emerald",
    biomass: "cyan",
    nuclear: "sky",
    other: "blue",
    imports: "orange",
};

export default function GenerationMixPieChart() {
    const [chartdata, setChartdata] = useState([{}]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://api.tinybird.co/v0/pipes/generation_mix_api.json?token=p.eyJ1IjogIjc4ZmVhOGY5LTkzNzYtNDQzMC1iNTUwLTA0YTU5MWM2ZTFjZSIsICJpZCI6ICJiYWFhZWNiYy1kMjk0LTQyM2QtOTc0Ny1lZjBiNDQyMDFmYTMifQ.wkD8QpT_oXE5UqEB92a9APCZOhBx_mN92PpWu3lkMQI&latest=true');
            const { data } = await res.json();
            const keys = ["coal", "gas", "hydro", "solar", "wind", "biomass", "nuclear", "other", "imports"];
            let transform: any = [];
            keys.forEach((key) => {
                transform.push({
                    group: key,
                    value: data[0][key]
                })
            })
            setChartdata(transform)
        }
        fetchData();
    }, []);

    return (
        <Card>
            <Title>Latest Generation Mix</Title>
            <div className="mt-24 h-auto">
                <DonutChart
                    data={chartdata}
                    category="value"
                    dataKey="group"
                    variant="pie"
                    height="h-96"
                    colors={Object.values(categoryColorMap)}
                />
            </div>
        </Card>
    )
};