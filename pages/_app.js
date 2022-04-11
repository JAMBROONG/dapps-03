import '../styles/globals.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (<>
    <Component {...pageProps} />
    <Script src='js/popper.min.js' />
    <Script src='js/bootstrap.js' />
    <Script src='js/jquery.js' />
  </>)
}

export default MyApp
