import "styles/globals.css";
import "tailwindcss/tailwind.css";
import 'react-notifications-component/dist/theme.css'
import type { AppProps } from "next/app";
import { wrapper } from 'redux/store';
import ReactNotification from 'react-notifications-component'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ReactNotification />
      <div className="container mx-auto min-h-screen">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default wrapper.withRedux(MyApp);
