import Layout from "../components/layout/Layout";
import "../styles/globals.css";

// component is a prop that holds the actual page content that should be rendered,
// so it will be different whenever we switch a page, and page props are specific props
// our pages might be getting,
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
