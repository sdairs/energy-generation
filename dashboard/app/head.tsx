export default function Head() {
  return (
    <>
      <title>Energy Generation</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Dashboard for UK Energy Generation" />
      <link rel="icon" href="/favicon.svg" />
      {process.env.VERCEL_ENV && process.env.VERCEL_ENV === "production" && (
        <script src="https://beamanalytics.b-cdn.net/beam.min.js" data-token="5ef93360-2cba-4abc-841b-cfabe3abcff7" async></script>
      )}
    </>
  )
}
