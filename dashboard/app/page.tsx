import { Inter } from '@next/font/google';
import styles from './page.module.css';
import {
  Card,
  Title,
  Text,
  ColGrid,
} from '@tremor/react';
import GenerationMixLineChart from './GenerationMixLineChart';
import GenerationMixPieChart from './GenerationMixPieChart';
import GenerationMixBarList from './GenerationMixBarList';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Title>Energy Generation</Title>

      <Card marginTop="mt-6">
        <Title>Generation Mix Over Time</Title>
        <GenerationMixLineChart />
      </Card>

      <ColGrid numColsMd={2} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
        <Card>
          <Title>Latest Generation Mix</Title>
          <GenerationMixPieChart />
        </Card>
        <Card>
          <Title>Generation Breakdown</Title>
          <GenerationMixBarList />
        </Card>
      </ColGrid>
    </main>
  )
}
