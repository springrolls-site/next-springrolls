import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Provider from "./provider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
