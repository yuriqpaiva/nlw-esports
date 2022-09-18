import * as Dialog from "@radix-ui/react-dialog";
import { MagnifyingGlassPlus } from "phosphor-react";

export function CreateAdBanner() {
  return (
    <div className="pt-1 bg-nlw-gradient w-full rounded-lg overflow-hidden mt-8 max-w-[1200px] mx-auto">
      <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center md:flex-row flex-col">
        <div className="w-full flex md:justify-start justify-center md:items-start items-center flex-col">
          <strong className="lg:text-2xl text-xl text-white font-black block md:text-start text-center">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 md:text-start text-center lg:text-base text-sm mt-1">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>

        <div className="w-full flex md:justify-end justify-center md:mt-0 mt-5">
          <Dialog.Trigger className="py-3 px-4 bg-violet-500 text-white rounded hover:bg-violet-600 flex items-center gap-3">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </Dialog.Trigger>
        </div>
      </div>
    </div>
  );
}
