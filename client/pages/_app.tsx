import React from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";

import store from "configuredStore";

const CustomApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default CustomApp;
