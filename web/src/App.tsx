import { useEffect, useState } from "react";
import logoImg from "./assets/logo.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateAdModal } from "./components/CreateAdModal";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import { CaretLeft, CaretRight } from "phosphor-react";
import Lottie from "react-lottie";
import gameControlLottie from "./assets/lotties/game-control.json";
import { KeenSliderOptions } from "keen-slider";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [options, setOptions] = useState<KeenSliderOptions>({});

  const [sliderRef, instanceRef] = useKeenSlider(options);

  useEffect(() => {
    axios("http://localhost:3333/games").then(({ data }) => {
      setGames(data);
      setOptions({
        slideChanged(slider: any) {
          setCurrentSlide(slider.track.details.rel);
        },
        created() {
        },
        renderMode: "precision",
        slides: {
          origin: "auto",
          perView: 6,
          spacing: 24,
        },
      });
    });
  }, []);

  useEffect(() => {
    instanceRef.current?.update();
  }, [games]);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient text-transparent bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>
      <div className="relative">
        <>
          <div
            ref={sliderRef}
            className="mt-16 relative max-w-[1200px] flex overflow-hidden"
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
          <>
            <button
              className="absolute -left-16 top-[calc(4rem+90px)]"
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
              className="absolute -right-16 top-[calc(4rem+90px)]"
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
        </>
      </div>
      {games.length === 0 && (
        <div className="mt-16 h-[240px]">
          <Lottie
            options={{
              loop: true,
              animationData: gameControlLottie,
            }}
            height={240}
          />
        </div>
      )}

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
