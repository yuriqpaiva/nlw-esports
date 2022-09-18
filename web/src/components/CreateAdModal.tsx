import * as Dialog from "@radix-ui/react-dialog";
import { CaretDown, CaretUp, Check, GameController } from "phosphor-react";
import { Input } from "./Form/Input";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useEffect, useState } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import axios from "axios";
import * as Select from "@radix-ui/react-select";

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);
  const [gameId, setGameId] = useState("");

  useEffect(() => {
    axios("http://192.168.5.227:3333/games").then(({ data }) => {
      setGames(data);
    });
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name) {
      return;
    }

    try {
      await axios.post(`http://192.168.5.227:3333/games/${gameId}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });

      alert("Anúncio criado com sucesso!");
    } catch (e) {
      alert("Erro ao criar anúncio");
    }
  }

  function getGameNameById(id: string): string {
    const [selectedGame] = games.filter((game) => game.id === id);
    return selectedGame.title;
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:rounded-lg sm:w-[480px] w-full sm:max-h-[651px] sm:overflow-hidden overflow-scroll h-full shadow-black/25">
        <Dialog.Title className="sm:text-3xl text-2xl font-black">
          Publique um anúncio
        </Dialog.Title>
        <form className="mt-8 flex flex-col gap-4" onSubmit={handleCreateAd}>
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <Select.Root value={gameId} onValueChange={setGameId}>
              <Select.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none w-full flex justify-between items-center">
                <Select.Value>
                  <span
                    className={`${gameId ? "text-white" : "text-zinc-400"}`}
                  >
                    {gameId
                      ? getGameNameById(gameId)
                      : "Selecione o game que deseja jogar"}
                  </span>
                </Select.Value>
                <Select.Icon>
                  <CaretDown size={24} className="text-zinc-400" />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className="rounded p-2 bg-zinc-900 bg-opacity-[0.98] border-violet-500 border-2 z-10">
                  <Select.ScrollUpButton>
                    <CaretUp size={32} className="text-zinc-300" />
                  </Select.ScrollUpButton>
                  <Select.Viewport className="flex flex-col gap-2">
                    {games.map((game) => {
                      return (
                        <Select.Item
                          value={game.id}
                          key={game.id}
                          className="text-zinc-200 cursor-pointer hover:bg-violet-500 rounded p-1 font-medium"
                        >
                          <Select.ItemText>{game.title}</Select.ItemText>
                          <Select.ItemIndicator />
                        </Select.Item>
                      );
                    })}
                  </Select.Viewport>
                  <Select.ScrollDownButton>
                    <CaretDown size={32} className="text-zinc-300" />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold">
              Seu nome (ou nickname)
            </label>
            <Input
              id="name"
              name="name"
              type="name"
              placeholder="Como te chamam dentro do game?"
            />
          </div>
          <div className="sm:grid sm:grid-cols-2 flex flex-col sm:gap-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying" className="font-semibold">
                Joga a quantos anos
              </label>
              <Input
                id="yearsPlaying"
                name="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord" className="font-semibold">
                Qual seu discord
              </label>
              <Input
                id="discord"
                name="discord"
                type="text"
                placeholder="Usuario#0000"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-2 flex flex-col sm:gap-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays" className="font-semibold">
                Quando costuma jogar?
              </label>
              <ToggleGroup.Root
                id="weekDays"
                value={weekDays}
                type="multiple"
                className="sm:grid sm:grid-cols-4 gap-2 flex"
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  title="Domingo"
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  title="Segunda"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  title="Terça"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  title="Quarta"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  title="Quinta"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  title="Sexta"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  title="Sábado"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart" className="font-semibold">
                Qual horário do dia?
              </label>
              <div className="grid grid-cols-2 sm:gap-2 gap-6">
                <div>
                  <label className="block text-zinc-100">De</label>
                  <Input
                    id="hourStart"
                    type="time"
                    name="hourStart"
                    placeholder="De"
                    dateFrom
                  />
                </div>
                <div>
                  <label className="block text-zinc-100">Até</label>
                  <Input
                    type="time"
                    id="hourEnd"
                    name="hourEnd"
                    placeholder="Até"
                  />
                </div>
              </div>
            </div>
          </div>

          <label className="mt-2 flex gap-2 text-sm items-center">
            <Checkbox.Root
              className="w-6 h-6 rounded bg-zinc-900 p-1"
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true);
                } else {
                  setUseVoiceChannel(false);
                }
              }}
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close className="bg-zinc-500 p-5 h-12 rounded-md font-semibold flex justify-center items-center hover:bg-zinc-600 sm:text-base text-sm">
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 p-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 sm:text-base text-sm"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
