import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SettingsProvider } from "../providers";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const { locale } = useRouter();
  const getLang = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("lang") || undefined;
    } else return locale;
  };

  const setLang = (e: string) => {
    if (typeof window !== "undefined") localStorage.setItem("lang", e);
  };

  return (
    <SettingsProvider>
      <select
        value={getLang()}
        onChange={(evt) => {
          const locale = evt.currentTarget.value;
          router.replace(router.asPath, router.asPath, { locale });
          setLang(locale);
        }}
        className="absolute top-0  left-0 z-50 block w-fit  cursor-pointer appearance-none border-white bg-transparent py-4  outline-none   "
      >
        <option className="bg-black " value="en">
          <picture>
            <img
              className="h-2 w-2"
              src="/images/game/icons/uk-flag.png"
              alt="flag of England"
            />
          </picture>
        </option>
        <option className="bg-black" value="el">
          <picture>
            <img
              className="h-2 w-2"
              src="/images/game/icons/greek-flag.png"
              alt="flag of Greece"
            />
          </picture>
        </option>
      </select>
      <Component className="font-style" {...pageProps} />
    </SettingsProvider>
  );
}
