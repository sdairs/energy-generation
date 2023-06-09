import { Inter } from "next/font/google";
import styles from "./page.module.css";
import GenerationMixLineChart from "./GenerationMixLineChart";
import GenerationMixPieChart from "./GenerationMixPieChart";
import GenerationMixBarList from "./GenerationMixBarList";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <main className={inter.className}>
      <div className="grid grid-rows-1 grid-flow-col gap-4 mx-8">
        <h1 className="text-center text-3xl my-8">UK Energy Generation</h1>
      </div>

      <div className="grid grid-rows-1 grid-flow-col gap-4 mx-8 mt-2">
        <GenerationMixLineChart />
      </div>

      <div className="grid grid-cols-2 gap-4 mx-8 mt-2 mb-8">
        <GenerationMixPieChart />
        <GenerationMixBarList />
      </div>

      <footer className="footer p-10 text-neutral-content bg-neutral">
        <div>
          <p>There is no Planet B</p>
          <svg
            fill="#ffffff"
            width="100px"
            height="100px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M19.35,8.84a4.781,4.781,0,0,0-3.239-4.356,4.167,4.167,0,0,0-8.222,0A4.78,4.78,0,0,0,4.649,8.84,4.234,4.234,0,0,0,6.176,17H11v4H8a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2H13V17h4.823A4.234,4.234,0,0,0,19.35,8.84ZM17.823,15H13V13.414l2.707-2.707a1,1,0,0,0-1.414-1.414L13,10.586V8a1,1,0,0,0-2,0v2.586L9.707,9.293a1,1,0,0,0-1.414,1.414L11,13.414V15H6.176a2.228,2.228,0,0,1-.321-4.424,1,1,0,0,0,.838-1.142,2.735,2.735,0,0,1,2.279-3.16,1,1,0,0,0,.857-.989c0-.026,0-.06-.005-.094a2.176,2.176,0,1,1,4.352-.008c0,.018,0,.036,0,.049a1,1,0,0,0,.855,1.042,2.736,2.736,0,0,1,2.28,3.163,1,1,0,0,0,.838,1.139A2.228,2.228,0,0,1,17.823,15Z"></path>
            </g>
          </svg>
        </div>
        <div>
          <span>Made with &#60;3 by Al Brown</span>
          <div className="grid grid-flow-col gap-4">
            <a href="https://twitter.com/sdairs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a href="https://data-folks.masto.host/@al">
              <svg
                width="24"
                height="24"
                viewBox="-103.4 -103.4 1240.80 1240.80"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                fill="#ffffff"
                stroke="#ffffff"
                transform="matrix(1, 0, 0, 1, 0, 0)"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fill="#fff"
                    d="M499 112q-93 1 -166 11q-81 11 -128 33l-14 8q-16 10 -32 25q-22 21 -38 47q-21 33 -32 73q-14 47 -14 103v37q0 77 1 119q3 113 18 188q19 95 62 154q50 67 134 89q109 29 210 24q46 -3 88 -12q30 -7 55 -17l19 -8l-4 -75l-22 6q-28 6 -57 10q-41 6 -78 4q-53 -1 -80 -7 q-43 -8 -67 -30q-29 -25 -35 -72q-2 -14 -2 -29l25 6q31 6 65 10q48 7 93 9q42 2 92 -2q32 -2 88 -9t107 -30q49 -23 81.5 -54.5t38.5 -63.5q9 -45 13 -109q4 -46 5 -97v-41q0 -56 -14 -103q-11 -40 -32 -73q-16 -26 -38 -47q-15 -15 -32 -25q-12 -8 -14 -8 q-46 -22 -127 -33q-74 -10 -166 -11h-3zM367 267q73 0 109 56l24 39l24 -39q36 -56 109 -56q63 0 101 43t38 117v239h-95v-232q0 -74 -61 -74q-69 0 -69 88v127h-94v-127q0 -88 -69 -88q-61 0 -61 74v232h-95v-239q0 -74 38 -117t101 -43z"
                  ></path>{" "}
                </g>
              </svg>
            </a>
            <a href="https://github.com/sdairs/energy-generation">
              <svg
                fill="#ffffff"
                width="24"
                height="24"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <title>github</title>{" "}
                  <path d="M16 1.375c-8.282 0-14.996 6.714-14.996 14.996 0 6.585 4.245 12.18 10.148 14.195l0.106 0.031c0.75 0.141 1.025-0.322 1.025-0.721 0-0.356-0.012-1.3-0.019-2.549-4.171 0.905-5.051-2.012-5.051-2.012-0.288-0.925-0.878-1.685-1.653-2.184l-0.016-0.009c-1.358-0.93 0.105-0.911 0.105-0.911 0.987 0.139 1.814 0.718 2.289 1.53l0.008 0.015c0.554 0.995 1.6 1.657 2.801 1.657 0.576 0 1.116-0.152 1.582-0.419l-0.016 0.008c0.072-0.791 0.421-1.489 0.949-2.005l0.001-0.001c-3.33-0.375-6.831-1.665-6.831-7.41-0-0.027-0.001-0.058-0.001-0.089 0-1.521 0.587-2.905 1.547-3.938l-0.003 0.004c-0.203-0.542-0.321-1.168-0.321-1.821 0-0.777 0.166-1.516 0.465-2.182l-0.014 0.034s1.256-0.402 4.124 1.537c1.124-0.321 2.415-0.506 3.749-0.506s2.625 0.185 3.849 0.53l-0.1-0.024c2.849-1.939 4.105-1.537 4.105-1.537 0.285 0.642 0.451 1.39 0.451 2.177 0 0.642-0.11 1.258-0.313 1.83l0.012-0.038c0.953 1.032 1.538 2.416 1.538 3.937 0 0.031-0 0.061-0.001 0.091l0-0.005c0 5.761-3.505 7.029-6.842 7.398 0.632 0.647 1.022 1.532 1.022 2.509 0 0.093-0.004 0.186-0.011 0.278l0.001-0.012c0 2.007-0.019 3.619-0.019 4.106 0 0.394 0.262 0.862 1.031 0.712 6.028-2.029 10.292-7.629 10.292-14.226 0-8.272-6.706-14.977-14.977-14.977-0.006 0-0.013 0-0.019 0h0.001z"></path>{" "}
                </g>
              </svg>
            </a>
          </div>
        </div>
      </footer>
      {process.env.VERCEL_ENV && process.env.VERCEL_ENV === "production" && (
        <script
          defer
          src="https://unpkg.com/@tinybirdco/flock.js"
          data-host="https://api.tinybird.co"
          data-token="p.eyJ1IjogIjY4NGU3Yjc3LWFjZWItNGE2YS1iOGZmLTUxN2YwNDY4ZDhjOCIsICJpZCI6ICJlZjRhMDdjNS04ZTc3LTRkNGMtODMyZi1jMmE2ZThkNTE4ZWEifQ.1JIiTDWfmfCPY1d1FJSERDhLlEXW11s2UUJ7je6KAOY"
        />
      )}
    </main>
  );
}
