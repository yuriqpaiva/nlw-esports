import { KeenSliderOptions } from "keen-slider";
import { useKeenSlider } from "keen-slider/react";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useEffect, useState } from "react";
import { GameBanner } from "./GameBanner";

interface GameSliderProps {
  games: {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
      ads: number;
    };
  }[];
}

export function GameSlider({ games }: GameSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    slideChanged(slider: any) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {},
    breakpoints: {
      "(max-width: 640px)": {
        slides: { perView: 1, spacing: 24 },
      },
      "(min-width: 640px)": {
        slides: { perView: 2, spacing: 24 },
      },
      "(min-width: 768px)": {
        slides: { perView: 4, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 5, spacing: 24 },
      },
      "(min-width: 1280px)": {
        slides: { perView: 6, spacing: 24 },
      },
    },
    slides: {
      perView: 6,
      spacing: 24,
    },
  });

  useEffect(() => {
    instanceRef.current?.update();
  }, [games]);

  return (
    <div className="relative w-full flex justify-center">
      <div
        ref={sliderRef}
        className="sm:mt-16 mt-12 relative max-w-[1200px] flex overflow-hidden w-full "
      >
        {games.map((game, index) => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
              index={index}
            />
          );
        })}
      </div>
      {games.length > 0 && (
        <>
          <button
            className="absolute -left-14 sm:top-[calc(4rem+90px)] top-[calc(3rem+90px)]"
            disabled={currentSlide === 0}
            onClick={(e: any) => {
              e.stopPropagation() || instanceRef.current?.prev();
            }}
          >
            <CaretLeft
              size={48}
              className={`text-zinc-300 transition-opacity ${
                currentSlide === 0 && "opacity-50"
              }`}
            />
          </button>
          <button
            className="absolute -right-14 sm:top-[calc(4rem+90px)] top-[calc(3rem+90px)]"
            disabled={
              instanceRef.current?.track.details?.maxIdx === currentSlide
            }
            onClick={(e: any) => {
              e.stopPropagation() || instanceRef.current?.next();
            }}
          >
            <CaretRight
              size={48}
              className={`text-zinc-300 ${
                instanceRef.current &&
                instanceRef.current?.track.details?.maxIdx === currentSlide &&
                "opacity-50"
              }`}
            />
          </button>
        </>
      )}
    </div>
  );
}
