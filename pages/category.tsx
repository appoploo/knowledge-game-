import { useT } from "@/Hooks/useT";
import { useSettings } from "@/providers";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Category() {
  const router = useRouter();
  const level = router.query.level as string;
  const settings = useSettings();
  const mute = settings.muted;
  const audio = () => new Audio("/audio/click.mp3");
  const t = useT();
  return (
    <div className=" h-screen w-screen overflow-hidden">
      <Head>
        <title>Memory Game</title>
      </Head>
      <div className="whole-bg h-full min-h-screen w-screen  bg-gradient-to-r">
        <main className="xs:py-16 md:py-16 lg:py-8">
          <div className="grid xs:grid-cols-[100px_200px_120px] md:grid-cols-[200px_350px_220px] lg:grid-cols-[300px_400px_320px] xl:grid-cols-[300px_700px_320px] 2xl:grid-cols-[300px_1fr_320px]">
            <div className=" w-full">
              <Link
                role="button"
                href={`/`}
                className=" flex xs:ml-12 md:ml-20 md:h-12 lg:ml-48 "
              >
                <picture>
                  <img
                    className="h-8 w-8"
                    src="/images/game/icons/back.png"
                    alt="back arrow icon"
                    draggable={false}
                  />
                </picture>
              </Link>
            </div>

            <div className="flex items-center justify-center  ">
              <h1 className="text-shadow flex h-fit w-fit text-center font-extrabold  text-white xs:ml-0 xs:text-lg md:ml-9  md:text-4xl lg:ml-0   ">
                {t("selectCategory")}
              </h1>
            </div>
            <div className=" w-full">
              <button
                className="h-fit w-fit xs:ml-4  md:ml-28"
                onClick={() => {
                  settings.setMute(!settings.muted);
                }}
              >
                {mute ? (
                  <picture>
                    <img
                      className="h-6 w-6"
                      src="/images/game/icons/sound-on.png"
                      alt="audio on icon"
                      draggable={false}
                    />
                  </picture>
                ) : (
                  <picture>
                    <img
                      className="h-6 w-6"
                      src="/images/game/icons/sound-off.png"
                      alt="audio off icon"
                      draggable={false}
                    />
                  </picture>
                )}
              </button>
            </div>
          </div>

          <hr className="opacity-40 xs:my-16 md:my-20 lg:my-8 xl:mb-40"></hr>
          <div className="container mx-auto mt-20 grid  w-full grid-cols-1 place-items-center gap-4">
            <Link
              role="button"
              className="text-shadow xl:h-30 flex transform  items-center justify-center rounded-md bg-white  text-center font-bold text-black shadow-lg transition duration-100 hover:text-yellow-300 xs:h-24 xs:w-4/5 md:h-44 md:w-2/3 md:text-3xl lg:h-20 lg:w-1/2 lg:text-lg"
              href={`/game`}
              onClick={() => {
                settings.setCategory("culturalΗeritage");
                if (!settings.muted) audio().play();
              }}
            >
              <button className="flex gap-2">
                <picture>
                  <img
                    className="h-6 w-6"
                    src="/images/game/icons/cultural.png"
                    alt="culture icon"
                  />
                </picture>
                {t("culturalΗeritage")}
              </button>
            </Link>
            <Link
              role="button"
              className="text-shadow xl:h-30 flex transform  items-center justify-center  rounded-md bg-white  text-center font-bold text-black shadow-lg transition duration-100 hover:text-yellow-300 xs:h-24 xs:w-4/5 md:h-44 md:w-2/3 md:text-3xl lg:h-20 lg:w-1/2 lg:text-lg"
              href={`/game`}
              onClick={() => {
                settings.setCategory("libraryContent");
                if (!settings.muted) audio().play();
              }}
            >
              <button className="flex gap-2">
                <picture>
                  <img
                    className="h-6 w-6"
                    src="/images/game/icons/library.png"
                    alt="books icon"
                  />
                </picture>
                {t("libraryContent")}
              </button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
