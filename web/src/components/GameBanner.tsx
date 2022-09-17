import "keen-slider/keen-slider.min.css";


interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
  index: number;
}

export function GameBanner({
  bannerUrl,
  title,
  adsCount,
  index,
}: GameBannerProps) {
  return (
    <a
      href=""
      className={`relative group overflow-hidden rounded-lg keen-slider__slide number-slide${
        index + 1
      }`}
    >
      <img
        src={bannerUrl}
        className="group-hover:scale-110 transition-all duration-300 object-cover w-full h-full"
      />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-zinc-300 text-sm block">
          {adsCount} anúncios(s)
        </span>
      </div>
    </a>
  );
}
