import { Inter } from '@next/font/google';
import styles from './page.module.css';
import GenerationMixLineChart from './GenerationMixLineChart';
import GenerationMixPieChart from './GenerationMixPieChart';
import GenerationMixBarList from './GenerationMixBarList';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={inter.className}>

      <div className="grid grid-rows-1 grid-flow-col gap-4 mx-8">
        <h1 className="text-center text-2xl mt-2">Energy Generation</h1>
      </div>

      <div className="grid grid-rows-1 grid-flow-col gap-4 mx-8 mt-2">
        <GenerationMixLineChart />
      </div>

      <div className="grid grid-cols-2 gap-4 mx-8 mt-2">
        <GenerationMixPieChart />
        <GenerationMixBarList />
      </div>
    </main>
  )
}
