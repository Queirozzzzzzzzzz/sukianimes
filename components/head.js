import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SukiAnimes</title>
        <link rel="icon" href="/public/img/icon.ico" />
      </Head>
      {children}
    </>
  );
}
