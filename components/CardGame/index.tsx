import { useSettings } from "@/providers";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useMemo } from "react";

export function CardGame() {
  const settings = useSettings();
  const router = useRouter();

  const suffledCategoryCards = useMemo(
    () => settings.categoryCards.sort((a, b) => -1 + Math.random() * 3),
    [settings.categoryCards]
  );

  const audio = () => new Audio("/audio/click.mp3");
  return (
    <div className="grid select-none grid-cols-4  gap-3">
      {suffledCategoryCards.map((c, idx) => {
        return (
          <div
            className={clsx({
              "pointer-events-none":
                idx === settings.flipCard1.idx ||
                idx === settings.flipCard2.idx ||
                settings.match?.includes(c.name),
            })}
            key={idx}
            onClick={function () {
              // an einai monos
              if (settings.clicks % 2 === 0)
                settings.setFlipCard1({ idx: idx, src: c.src, name: c.name });
              else
                settings.setFlipCard2({ idx: idx, src: c.src, name: c.name });
            }}
          >
            <div
              onClick={() => {
                if (!settings.muted) audio().play();
              }}
              className={clsx(
                "rounded-2xl xs:h-24 xs:w-20 md:h-48 md:w-40 lg:h-28 lg:w-32 xl:h-40 xl:w-44  2xl:h-44 2xl:w-44 ",
                {
                  "blinking-border":
                    idx === settings.flipCard1.idx ||
                    idx === settings.flipCard2.idx,
                },
                {
                  "opacity-50": settings.match?.includes(c.name),
                } // makes gray the cards who are matched
              )}
            >
              <picture>
                <img
                  className="h-full w-full cursor-pointer select-none  bg-white object-fill "
                  draggable={false}
                  src={c.src}
                  alt="picture"
                />
              </picture>
            </div>
          </div>
        );
      })}
    </div>
  );
}
