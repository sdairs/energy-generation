'use client';

import { useState, useEffect } from 'react';
import { Block, Flex, LineChart, Title, Toggle, Text, ToggleItem, Card } from "@tremor/react";

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
            <div className="md:flex justify-between">
                <Block>
                    <Flex justifyContent="justify-start" spaceX="space-x-0.5" alignItems="items-center">
                        <Title> Generation Mix Over Time </Title>
                        {/* <Icon
                            icon={InformationCircleIcon}
                            variant="simple"
                            tooltip="Shows day-over-day (%) changes of past performance"
                        /> */}
                    </Flex>
                    <Text> Daily increase or decrease per domain </Text>
                </Block>
                <div className="mt-6 md:mt-0">
                    <Toggle
                        color="zinc"
                        // defaultValue={selectedKpi}
                        // handleSelect={(value) => setSelectedKpi(value)}
                    >
                        <ToggleItem value="week" text="Week" />
                        <ToggleItem value="year" text="Year" />
                        <ToggleItem value="decade" text="Decade" />
                    </Toggle>
                </div>
            </div>
            <LineChart
                dataKey="time_from"
                data={chartdata}
                categories={["coal", "gas", "biomass", "hydro", "imports", "nuclear", "solar", "other", "wind"]}
            />
        </Card>

    )
};