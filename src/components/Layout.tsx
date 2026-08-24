import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <div className="root">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#f7f5f0" />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <style jsx>
        {`
          .root {
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            min-height: 100%;
          }
          main {
            display: flex;
            flex-direction: column;
            flex: 1 0 auto;
            min-width: 0;
          }
        `}
      </style>
    </div>
  );
}
