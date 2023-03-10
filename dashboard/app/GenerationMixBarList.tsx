'use client';

import { useState, useEffect } from 'react';
import {
  BarList,
  Card,
  AccordionList,
  Accordion,
  AccordionHeader,
  AccordionBody
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
      const res = await fetch('/api/energy/get_generation_mix?range=latest');
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
    <Card>
      <AccordionList>
        <Accordion expanded={true} >
          <AccordionHeader>Fossils ({fossils_total}%)</AccordionHeader>
          <AccordionBody>
            <BarList data={fossils_data} valueFormatter={(v) => `${v}%`} color="gray" marginTop="mt-2" />
          </AccordionBody>
        </Accordion>
        <Accordion expanded={true} >
          <AccordionHeader>Renewables ({renewables_total}%)</AccordionHeader>
          <AccordionBody>
            <BarList data={renewables_data} valueFormatter={(v) => `${v}%`} color="green" marginTop="mt-2" />
          </AccordionBody>
        </Accordion>
        <Accordion expanded={true} >
          <AccordionHeader>Other ({other_total}%)</AccordionHeader>
          <AccordionBody>
            <BarList data={other_data} valueFormatter={(v) => `${v}%`} color="blue" marginTop="mt-2" />
          </AccordionBody>
        </Accordion>
      </AccordionList>
    </Card>
  )
};


