import Head from "/components/head.js";
import Header from "/components/header.js";
import Footer from "/components/footer.js";

export default function Layout({ children }) {
  return (
    <>
      <Head />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
