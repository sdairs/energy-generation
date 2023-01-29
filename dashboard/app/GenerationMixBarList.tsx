'use client';

import { useState, useEffect } from 'react';
import {
  BarList,
  Card,
  Title,
} from '@tremor/react';

export default function GenerationMixBarList() {
  const [fossils_data, set_fossils_data] = useState([]);
  const [renewables_data, set_renewables_data] = useState([]);
  const [other_data, set_other_data] = useState([]);
  const [fossils_total, set_fossils_total] = useState();
  const [renewables_total, set_renewables_total] = useState();
  const [other_total, set_other_total] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://api.tinybird.co/v0/pipes/generation_mix_api.json?token=p.eyJ1IjogIjc4ZmVhOGY5LTkzNzYtNDQzMC1iNTUwLTA0YTU5MWM2ZTFjZSIsICJpZCI6ICJiYWFhZWNiYy1kMjk0LTQyM2QtOTc0Ny1lZjBiNDQyMDFmYTMifQ.wkD8QpT_oXE5UqEB92a9APCZOhBx_mN92PpWu3lkMQI&latest=true');
      const { data } = await res.json();
      // Fossils
      set_fossils_total(data[0]['fossils']);
      const fossils_keys = ["coal", "gas"];
      let fossils_transform: any = [];
      fossils_keys.forEach((key) => {
        fossils_transform.push({
          name: key,
          value: data[0][key]
        })
      })
      set_fossils_data(fossils_transform);
      // Renewables
      set_renewables_total(data[0]['renewables']);
      const renewables_keys = ["hydro", "solar", "wind"];
      let renewables_transform: any = [];
      renewables_keys.forEach((key) => {
        renewables_transform.push({
          name: key,
          value: data[0][key]
        })
      })
      set_renewables_data(renewables_transform);
      // Others
      set_other_total(data[0]['other_sources']);
      const other_keys = ["biomass", "nuclear", "other"];
      let other_transform: any = [];
      other_keys.forEach((key) => {
        other_transform.push({
          name: key,
          value: data[0][key]
        })
      })
      set_other_data(other_transform);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="grid rounded">
        <Card maxWidth="max-w-lg">
          <Title>Fossils ({fossils_total}%)</Title>
          <BarList data={fossils_data} marginTop="mt-2" />
        </Card>
      </div>
      <div className="grid rounded">
        <Card maxWidth="max-w-lg">
          <Title>Renewables ({renewables_total}%)</Title>
          <BarList data={renewables_data} marginTop="mt-2" />
        </Card>
      </div>
      <div className="grid rounded">
        <Card maxWidth="max-w-lg">
          <Title>Other ({other_total}%)</Title>
          <BarList data={other_data} marginTop="mt-2" />
        </Card>
      </div>
    </div>
  )
};


