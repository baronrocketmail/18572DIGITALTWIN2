import '../styles/globals.css'
import Head from "next/head";
import {fetchPropertyInfoObj, fetchUnpaidObjArray} from "./api/dataFetching.mjs";


function MyApp({ Component, pageProps }) {
  return (
      <>
        <Head>
          <title>{process.env.NEXT_PUBLIC_TAB_NAME}</title>
        </Head>
      <Component {...pageProps} />
      </>
  )
}
export default MyApp
