import "../styles/globals.css";
import AppContext from "./../.context";

function MyApp({ Component, pageProps }) {
  return (
    <AppContext.Provider>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
