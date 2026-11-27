import { CountUp } from "@/components/motion/count-up";
import { Photo } from "@/components/ui/photo";

export type NumberPanel = {
  value: number;
  suffix?: string;
  label: string;
  text: string;
  photo: string;
};

/**
 * Full-width photo panels that stack as you scroll (each one slides over the
 * last), with a giant outlined lime number. Breaks out of the page container.
 */
export function NumbersSection({ panels }: { panels: NumberPanel[] }) {
  return (
    <section
      aria-labelledby="numbers-title"
      className="relative mt-16 ml-[calc(50%-50vw)] w-screen"
    >
      <h2 id="numbers-title" className="sr-only">
        Bazar in numbers
      </h2>
      {panels.map((panel, i) => (
        <div
          key={panel.label}
          className="sticky top-[60px] h-[72vh] min-h-[440px] overflow-hidden bg-ink-900 text-white"
          style={{ zIndex: i + 1 }}
        >
          <div aria-hidden="true" className="absolute inset-0">
            <Photo name={panel.photo} alt="" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/45 to-ink-900/30" />
          </div>
          <div className="relative mx-auto flex h-full w-full max-w-[1200px] flex-col justify-end px-4 pb-10 tablet:px-6 tablet:pb-14 desktop:px-8">
            <p className="font-heading text-[6.5rem] font-extrabold leading-[0.9] tracking-[-0.05em] tablet:text-[11rem] desktop:text-[14rem]">
              <CountUp
                value={panel.value}
                suffix={panel.suffix}
                className="text-outline-lime"
              />
            </p>
            <p className="mt-4 font-heading text-h2 font-bold text-white tablet:text-[2rem] tablet:leading-[2.5rem]">
              {panel.label}
            </p>
            <p className="mt-2 max-w-md text-body-l text-white/80">
              {panel.text}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
