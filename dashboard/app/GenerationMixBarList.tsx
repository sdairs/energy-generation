import {
  BarList,
  Card,
  Title,
  Bold,
  Flex,
  Text,
} from '@tremor/react';

const data = [
  { name: 'Source 1', value: 456 },
  { name: 'Source 2', value: 351 },
];

export default () => (
  <div>
    <div className="grid rounded">
      <Card maxWidth="max-w-lg">
        <Title>Fossils</Title>
        <BarList data={data} marginTop="mt-2" />
      </Card>
    </div>
    <div className="grid rounded">
      <Card maxWidth="max-w-lg">
        <Title>Renewables</Title>
        <BarList data={data} marginTop="mt-2" />
      </Card>
    </div>
    <div className="grid rounded">
      <Card maxWidth="max-w-lg">
        <Title>Other</Title>
        <BarList data={data} marginTop="mt-2" />
      </Card>
    </div>
  </div>
);


