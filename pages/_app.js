import React from "react";

import App from "next/app";
import Head from "next/head";
import { Provider } from "@shopify/app-bridge-react";
import ClientRouter from "../components/ClientRouter";

import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";

class MyApp extends App {
  render() {
    const { Component, pageProps, shopOrigin } = this.props;

    const config = { apiKey: API_KEY, shopOrigin, forceRedirect: true };

    return (
      <React.Fragment>
        <Head>
          <title>Sample App</title>
          <meta charSet="utf-8" />
        </Head>
        <Provider config={config}>
          <ClientRouter />
          <AppProvider i18n={translations}>
            <Component {...pageProps} />
          </AppProvider>
        </Provider>
      </React.Fragment>
    );
  }
}
MyApp.getInitialProps = async ({ ctx }) => {
  return {
    shopOrigin: ctx.query.shop,
  };
};
export default MyApp;
