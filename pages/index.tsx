import { useT } from "@/Hooks/useT";
import { useSettings } from "@/providers";

import Link from "next/link";

import { useRef } from "react";

export default function Home() {
  const settings = useSettings();
  const mute = settings.muted;
  const audio = () => new Audio("/audio/click.mp3");
  const ref = useRef<HTMLInputElement>(null);
  const t = useT(); // passes to the component the translation function

  return (
    <div className=" h-screen w-screen overflow-hidden ">
      <div className="whole-bg h-full min-h-screen w-screen  bg-gradient-to-r">
        <main
          onClick={(evt) => {
            if (!ref.current || ref.current?.checked === false) return;
            if (ref.current?.checked === true) ref.current.checked = false;
          }}
          className="xs:p-16 md:p-16 lg:p-8 "
        >
          <div className="flex  items-center justify-center gap-4">
            <h1 className="text-shadow text-center font-extrabold text-white xs:text-2xl md:text-5xl">
              Knowledge Game
            </h1>
            <picture>
              <img
                className="h-8 w-8"
                src="/images/game/icons/library.png"
                alt="books icon"
              />
            </picture>
          </div>

          <hr className="opacity-40 xs:my-16 md:my-20 lg:my-8 xl:mb-40"></hr>
          <div className="container mx-auto mt-20 grid  w-full grid-cols-1 place-items-center gap-4">
            <Link
              role="button"
              className="text-shadow xl:h-30 flex transform  items-center justify-center rounded-md bg-white bg-gradient-to-tl text-center font-bold text-black shadow-lg transition duration-100 hover:text-yellow-300 xs:h-24 xs:w-4/5 md:h-44 md:w-2/3 md:text-3xl lg:h-20 lg:w-1/2 lg:text-lg"
              href="/category"
              onClick={(evt) => {
                if (!settings.muted) audio().play();
              }}
            >
              <>
                <picture className="mr-4">
                  <img
                    className="h-6 w-6"
                    src="/images/game/icons/start-game.png"
                    alt="play icon"
                  />
                </picture>
                <div>{t("startGame")}</div>
              </>
            </Link>
            <button
              onClick={(evt) => {
                settings.setMute(!settings.muted);
                if (!settings.muted) audio().play();
              }}
              className="text-shadow xl:h-30 flex transform  items-center justify-center  rounded-md bg-white bg-gradient-to-tl text-center font-bold text-black shadow-lg transition duration-100 hover:text-yellow-300 xs:h-24 xs:w-4/5 md:h-44 md:w-2/3 md:text-3xl lg:h-20 lg:w-1/2 lg:text-lg"
            >
              {mute ? (
                <picture className="mr-4">
                  <img
                    className="h-6 w-6"
                    src="/images/game/icons/sound-on.png"
                    alt="audio on icon"
                  />
                </picture>
              ) : (
                <picture className="mr-4">
                  <img
                    className="h-6 w-6"
                    src="/images/game/icons/sound-off.png"
                    alt="audio off icon"
                  />
                </picture>
              )}
              <div>{mute ? t("audioOn") : t("audioOff")}</div>
            </button>

            <button
              onClick={(evt) => {
                evt.stopPropagation(); // stops passing the data from the father to the kid
                if (!settings.muted) audio().play();
                if (!ref.current || ref.current?.checked === true) return;
                if (ref.current?.checked === false) ref.current.checked = true;
              }}
              className="text-shadow xl:h-30 flex transform  items-center justify-center rounded-md bg-white bg-gradient-to-tl text-center font-bold text-black shadow-lg transition duration-100 hover:text-yellow-300 xs:h-24 xs:w-4/5 md:h-44 md:w-2/3 md:text-3xl lg:h-20 lg:w-1/2 lg:text-lg"
            >
              <picture className="mr-4">
                <img
                  className="h-6 w-6"
                  src="/images/game/icons/info-2.png"
                  alt="instructions icon"
                />
              </picture>{" "}
              <div>{t("instructions")}</div>
            </button>

            <input
              ref={ref}
              checked={ref?.current?.checked}
              type="checkbox"
              id="my-modal"
              className="modal-toggle"
            />

            <div className="modal ">
              <div className="modal-box  overflow-hidden bg-white md:h-fit md:w-full lg:relative ">
                <h3 className="mb-4 text-center font-extrabold text-black xs:text-xl md:text-3xl lg:text-2xl">
                  Knowledge Game - {t("instructions")}
                </h3>
                <div className="mb-2 py-2 text-black">
                  <h2 className="xs:text-base md:text-xl lg:text-lg">
                    {t("adviceToWin")}
                  </h2>
                  <h2 className="xs:text-base md:text-xl lg:text-lg">
                    {t("ruleOfEasy")}
                  </h2>
                </div>
                <div className="py-4 text-black ">
                  <h2 className="mb-4 text-center font-bold  xs:text-base md:text-xl lg:text-lg">
                    {t("existingCategories")}
                  </h2>
                  <div className="mb-2 flex gap-2 font-bold text-black xs:text-lg md:text-2xl lg:text-xl">
                    <picture>
                      <img
                        className="h-6 w-6"
                        src="/images/game/icons/cultural.png"
                        alt="culture icon"
                      />
                    </picture>
                    <label>{t("culturalΗeritage")}</label>
                  </div>
                  <div className="flex gap-2 font-bold text-black xs:text-lg md:text-2xl lg:text-xl">
                    <picture>
                      <img
                        className="h-6 w-6"
                        src="/images/game/icons/library.png"
                        alt="books icon"
                      />
                    </picture>
                    <label>{t("libraryContent")}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
