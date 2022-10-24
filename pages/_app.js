import '../styles/globals.css'
import Head from "next/head";
import {fetchPropertyInfoObj, fetchUnpaidObjArray} from "./api/dataFetching.mjs";


function MyApp({ Component, pageProps }) {
  return (
      <>
        <Head>
          <title>18572 Cull Canyon Rd</title>
        </Head>
      <Component {...pageProps} />
      </>
  )
}
export default MyApp
