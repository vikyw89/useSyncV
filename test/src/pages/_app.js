import { initStores } from '@/lib/store';
import '@/styles/globals.css';

initStores();
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
