import '../app/globals.css'; // Ensure this is the correct path to your global CSS file
import { WindowProvider } from '../contexts/WindowContext';

function MyApp({ Component, pageProps }) {
  return (
    <WindowProvider>
      <Component {...pageProps} />
    </WindowProvider>
  );
}

export default MyApp;

