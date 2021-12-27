import '../styles/globals.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
