import './globals.css'
import '@tremor/react/dist/esm/tremor.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light" className='bg-stone-50'>
      <head />
      <body>{children}</body>
    </html>
  )
}
