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
    if (typeof window !== "undefined") {
      router.push("/", "/", {
        locale: e,
      });

      localStorage.setItem("lang", e);
    }
  };

  const src =
    getLang() === "en"
      ? "/images/game/icons/uk-flag.png"
      : "/images/game/icons/greek-flag.png";

  return (
    <SettingsProvider>
      <div className="fixed top-4 left-4  z-50  h-fit ">
        <div className="dropdown dropdown-hover">
          <label tabIndex={0}>
            <picture>
              <img className="h-7 w-7" src={src} alt="" />
            </picture>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content  menu rounded-box  w-16 bg-transparent"
          >
            <li>
              <picture>
                <img
                  onClick={() => setLang("el")}
                  className="h-full w-full"
                  src="/images/game/icons/greek-flag.png"
                  alt="flag of Greece"
                />
              </picture>
            </li>
            <li>
              <picture>
                <img
                  onClick={() => setLang("en")}
                  className="h-full w-full"
                  src="/images/game/icons/uk-flag.png"
                  alt="flag of England"
                />
              </picture>
            </li>
          </ul>
        </div>
      </div>
      <Component {...pageProps} />
    </SettingsProvider>
  );
}
