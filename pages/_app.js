import React from "react";

import App from "next/app";
import Head from "next/head";
import { Provider } from "@shopify/app-bridge-react";
import ClientRouter from "../components/ClientRouter";
import Cookies from "js-cookie";

import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  fetchOptions: {
    credentials: "include",
  },
});
class MyApp extends App {
  render() {
    const { Component, pageProps, shopOrigin } = this.props;
    console.log("env🔥", process.env);
    console.log("🔑🔑🔑customKey", process.env.NEXT_PUBLIC_customKey);

    const config = {
      apiKey: process.env.NEXT_PUBLIC_customKey,
      shopOrigin: shopOrigin,
      forceRedirect: true,
    };

    return (
      <React.Fragment>
        <Head>
          <title>Sample App</title>
          <meta charSet="utf-8" />
        </Head>
        <Provider config={config}>
          <ClientRouter />
          <AppProvider i18n={translations}>
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
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
