import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.css';

import AppContextProvider from '../context/AppContext';

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

export default MyApp;
