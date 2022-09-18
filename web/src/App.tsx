import { useEffect, useState } from "react";
import logoImg from "./assets/logo.svg";
import { CreateAdBanner } from "./components/CreateAdBanner";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateAdModal } from "./components/CreateAdModal";
import axios from "axios";
import Lottie from "react-lottie-player";
import gameControlLottie from "./assets/lotties/game-control.json";
import { GameSlider } from "./components/GameSlider";

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

  useEffect(() => {
    axios("http://192.168.5.227:3333/games").then(({ data }) => {
      setGames(data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center sm:my-20 my-12 px-12 overflow-hidden">
      <img src={logoImg} className="sm:w-[286px] w-[180px]"/>

      <h1 className="xl:text-6xl lg:text-5xl sm:text-4xl text-3xl text-white font-black sm:mt-20 mt-12 text-center">
        Seu{" "}
        <span className="bg-nlw-gradient text-transparent bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <GameSlider games={games} />

      {games.length === 0 && (
          <Lottie
            animationData={gameControlLottie}
            loop={true}
            play
            style={{ height: 240, width: 180 }}
          />
      )}

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
