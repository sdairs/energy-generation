import { Inter } from '@next/font/google';
import styles from './page.module.css';
import {
  Card,
  Title,
  Text,
  ColGrid,
} from '@tremor/react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Title>Energy Generation</Title>

      <Card marginTop="mt-6">
        <div className="h-96" />
      </Card>

      <ColGrid numColsMd={2} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
        <Card>
          <div className="h-28" />
        </Card>
        <Card>
          <div className="h-28" />
        </Card>
      </ColGrid>
    </main>
  )
}
