import { type AppType } from "next/dist/shared/lib/utils";
import { Inter } from "next/font/google";
import { Toaster } from "~/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-sans: ${inter.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
};

export default MyApp;
