import { CardGame } from "@/components/CardGame";
import { useT } from "@/Hooks/useT";
import { useSettings } from "@/providers";
import { clsx } from "clsx";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCountdown } from "usehooks-ts";

export default function Game() {
  const router = useRouter();
  const { locale } = useRouter();
  const settings = useSettings();
  const t = useT();
  const mute = settings.muted;
  const audioendoftime = () => new Audio("/audio/end-of-time.mp3");
  const audioformatch = () => new Audio("/audio/correct.mp3");
  const audioformistake = () => new Audio("/audio/wrong.mp3");

  const [count, { startCountdown }] = useCountdown({
    countStart: settings.startingTime,
    intervalMs: 1000,
  }); // counts reverse , which depends on the level

  // LOSE CRITERIA
  useEffect(() => {
    if (settings.clicks > settings.maxClicks) {
      settings.setTime(count);
      router.push(`/gameover`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.clicks, settings.maxClicks, router, count]);

  useEffect(() => {
    if (count === 0) {
      settings.setTime(count);
      router.push(`/gameover`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, settings.match.length, settings.matchesToWin, router]);

  // WIN CRITERIA
  useEffect(() => {
    if (settings.match.length >= settings.matchesToWin) {
      settings.setTime(count);
      router.push(`/win`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, settings.match.length, settings.matchesToWin, router]);

  // sets the audio when the time is over
  useEffect(() => {
    if (!settings.muted && count === 1) audioendoftime().play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  // sets the audio when you find a match
  useEffect(() => {
    if (!settings.muted) audioformatch().play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.match.length]);

  // sets the audio when you make a mistake with matching
  useEffect(() => {
    if (
      !settings.muted &&
      settings.flipCard1.name !== settings.flipCard2.name &&
      settings.flipCard2.idx !== -1
    )
      audioformistake().play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.flipCard1, settings.flipCard2]);
  return (
    <div className=" h-screen w-screen overflow-hidden">
      <Head>
        <title>Memory Game</title>
      </Head>
      <div>
        <div>
          <div className=" whole-bg h-full min-h-screen w-screen  bg-gradient-to-r xs:py-6 md:py-8 lg:py-4 2xl:py-8">
            <div className="grid xs:grid-cols-[70px_250px_70px] md:grid-cols-[200px_400px_220px] lg:grid-cols-[300px_400px_320px] xl:grid-cols-[300px_700px_320px] 2xl:grid-cols-[300px_1fr_320px]">
              <div className=" h-full w-full">
                <Link
                  role="button"
                  href={`/category`}
                  className=" flex xs:ml-9  md:ml-20 md:h-12 md:w-10  lg:ml-48 "
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

              <div className="flex flex-col items-center justify-center ">
                <div className="flex  items-center justify-center gap-4">
                  <h1 className="text-shadow h-fit w-fit text-center font-extrabold text-white xs:text-2xl md:text-4xl  lg:text-3xl xl:text-5xl  ">
                    Knowledge Game
                  </h1>
                  <picture>
                    <img
                      className="h-8 w-8"
                      src="/images/game/icons/library.png"
                      alt="books icon"
                      draggable={false}
                    />
                  </picture>
                </div>

                <br />
              </div>
              <div className="flex h-full w-full items-center">
                <button
                  className=" h-fit  w-fit  text-xl xs:mr-1  xs:w-fit md:ml-20"
                  onClick={() => {
                    settings.setMute(!settings.muted); // sets the sound
                  }}
                >
                  {mute ? (
                    <picture>
                      <img
                        className="h-6 w-6"
                        src="/images/game/icons/sound-off.png"
                        alt="audio off icon"
                        draggable={false}
                      />
                    </picture>
                  ) : (
                    <picture>
                      <img
                        className="h-6 w-6"
                        src="/images/game/icons/sound-on.png"
                        alt="audio on icon"
                        draggable={false}
                      />
                    </picture>
                  )}
                </button>
              </div>
            </div>

            <hr className="w-full opacity-40 xs:my-6 md:my-8 lg:my-3 2xl:my-8 "></hr>
            <div className="text-shadow grid h-fit w-full place-items-center font-extrabold text-white xs:pb-4 xs:text-xl  md:pb-4 md:text-3xl  lg:text-2xl xl:text-3xl ">
              {settings.category === "culturalΗeritage" ? (
                <div className="flex gap-2">
                  <picture className="mt-2">
                    <img
                      className="h-6 w-6"
                      src="/images/game/icons/cultural.png"
                      alt="culture icon"
                      draggable={false}
                    />
                  </picture>
                  <label>{t("culturalΗeritage")}</label>
                </div>
              ) : (
                <div className="flex gap-2">
                  <picture className="mt-2">
                    <img
                      className="h-6 w-6"
                      src="/images/game/icons/library.png"
                      alt="books icon"
                      draggable={false}
                    />
                  </picture>
                  <label>{t("libraryContent")}</label>
                </div>
              )}
            </div>

            <div className="grid  h-full  w-full place-items-center  ">
              <div
                className={clsx(" w-fit", {
                  "xs:w-5/6 md:w-4/6 lg:w-fit xl:w-1/3 ": locale === "en",
                })}
              >
                <div className="mb-4 grid w-full grid-cols-3 ">
                  <div
                    className={clsx(
                      "flex gap-3 font-bold  ",
                      {
                        "text-white xs:text-lg md:text-3xl lg:text-xl 2xl:text-3xl":
                          count >= 10,
                      },
                      {
                        "blink text-red-700 xs:text-lg md:text-4xl lg:text-2xl 2xl:text-4xl":
                          count < 10,
                      }
                    )}
                  >
                    <h2>{t("time")} :</h2>
                    <div>{count}</div>
                  </div>

                  <div className="flex w-full items-center justify-center font-bold text-white xs:text-lg md:text-3xl lg:text-xl 2xl:text-3xl">
                    <h2>
                      {t("score")} : {settings.match.length}
                    </h2>
                  </div>
                  <div
                    className={clsx(
                      " h-full w-full  font-bold  text-white  xs:text-lg md:text-3xl lg:text-xl 2xl:text-3xl",
                      { " flex items-end justify-end": locale === "en" }
                    )}
                  >
                    <h2>
                      {t("clicks")} : {settings.clicks}
                    </h2>
                  </div>
                </div>
              </div>
              <div onClick={startCountdown}>
                <CardGame />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
