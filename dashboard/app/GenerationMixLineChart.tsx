"use client";

import { useState, useEffect } from "react";
import {
  Flex,
  Title,
  TabGroup,
  TabList,
  Tab,
  AreaChart,
  Color,
  Card,
} from "@tremor/react";

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

const times = ["day", "week", "year", "decade"];

export default function GenerationMixLineChart() {
  const [chartdata, setChartdata] = useState([]);
  const [selectedTime, setSelectedTime] = useState(0);

  const areaChartArgs = {
    className: "mt-5 h-72",
    data: chartdata,
    index: "time_from",
    categories: Object.keys(categoryColorMap),
    colors: Object.values(categoryColorMap),
    showLegend: false,
    yAxisWidth: 56,
  };

  async function fetchData(index: number) {
    const res = await fetch(
      `/api/energy/get_generation_mix?range=${times[index]}`
    );
    const { data } = await res.json();
    setSelectedTime(index);
    console.log(data);
    setChartdata(data);
  }

  useEffect(() => {
    fetchData(0);
  }, []);

  return (
    <Card>
      <div className="md:flex justify-between">
        <div>
          <Flex
            className="space-x-0.5"
            justifyContent="start"
            alignItems="center"
          >
            <Title> Generation Mix Over Time </Title>
          </Flex>
        </div>
        <div>
          <TabGroup index={selectedTime} onIndexChange={fetchData}>
            <TabList color="gray" variant="solid">
              <Tab>Day</Tab>
              <Tab>Week</Tab>
              <Tab>Year</Tab>
              <Tab>Decade</Tab>
            </TabList>
          </TabGroup>
        </div>
      </div>
      {/* web */}
      <div className="mt-8 hidden sm:block">
        <AreaChart {...areaChartArgs} />
      </div>
      {/* mobile */}
      <div className="mt-8 sm:hidden">
        <AreaChart
          {...areaChartArgs}
          startEndOnly={true}
          showGradient={false}
          showYAxis={false}
        />
      </div>
    </Card>
  );
}
