import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import { useAuthenticate } from "@/hooks/user/useAuthenticate";

function AppContent({ Component, pageProps }: AppProps) {
  useAuthenticate();
  return (
    <>
      <Toaster position="top-center" />
      <Component {...pageProps} />
    </>
  );
}

function MyApp(props: AppProps) {
  return (
    <RecoilRoot>
      <AppContent {...props} />
    </RecoilRoot>
  );
}

export default MyApp;