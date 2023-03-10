'use client';

import { useState, useEffect } from 'react';
import { Block, Flex, Title, Toggle, Color, ToggleItem, Card, AreaChart } from "@tremor/react";

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

export default function GenerationMixLineChart() {
    const [chartdata, setChartdata] = useState([]);
    const [selectedTime, setSelectedTime] = useState('day');

    async function fetchData(time: string) {
        const res = await fetch(`/api/get_generation_mix?range=${time}`);
        const { data } = await res.json();
        console.log(data)
        setChartdata(data)
    }

    useEffect(() => {
        fetchData('day');
    }, []);

    return (
        <Card>
            <div className="md:flex justify-between">
                <Block>
                    <Flex justifyContent="justify-start" spaceX="space-x-0.5" alignItems="items-center">
                        <Title> Generation Mix Over Time </Title>
                    </Flex>
                </Block>
                <div className="mt-6 md:mt-0">
                    <Toggle
                        color="zinc"
                        defaultValue={selectedTime}
                        onValueChange={(value) => fetchData(value)}
                    >
                        <ToggleItem value="day" text="Day" />
                        <ToggleItem value="week" text="Week" />
                        <ToggleItem value="year" text="Year" />
                        <ToggleItem value="decade" text="Decade" />
                    </Toggle>
                </div>
            </div>
            <AreaChart
                dataKey="time_from"
                data={chartdata}
                categories={["coal", "gas", "hydro", "solar", "wind", "biomass", "nuclear", "other", "imports"]}
                colors={Object.values(categoryColorMap)}
            />
        </Card>

    )
};