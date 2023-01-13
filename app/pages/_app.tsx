import "../styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "../components/sidebar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="w-full max-w-3xl lg:max-w-4xl mx-auto">
        <div className="py-4 md:py-8 md:pl-4 md:pr-8 fixed w-20 md:w-64">
          <Sidebar />
        </div>
        <main className="flex-1 border-r border-l ml-20 md:ml-64 min-h-screen">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}
