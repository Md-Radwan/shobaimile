import Image from "next/image";
import { Card, CardFooter } from "@heroui/react";
import galleryImg1 from '/GalleryImg1.png'

type GalleryItem = {
  id: number;
  title: string;
  location: string;
  detail: string;
  src: string;
  alt: string;
  /** Tailwind col-span on md+ (grid has 3 columns) */
  span: string;
  /** Keeps the subject of each photo in frame when cropped */
  position: string;
};

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "Midnight Warmth Operation",
    location: "Puran Dhaka",
    detail: "850 Blankets Delivered",
    src: "/GalleryImg1.png",
    alt: "A volunteer wrapping a blanket around an elderly rickshaw puller on a night street in Puran Dhaka",
    span: "md:col-span-2",
    position: "object-[50%_40%]",
  },
  {
    id: 2,
    title: "Education for All Kit Packing",
    location: "Tejgaon Warehouse",
    detail: "1,200 Kits",
    src: "/GalleryImg2.png",
    alt: "Volunteers packing school bags and books into education kits",
    span: "md:col-span-1",
    position: "object-center",
  },
  {
    id: 3,
    title: "Hatirjheel Green Canopy",
    location: "Dhaka Central",
    detail: "600 Fruit Saplings",
    src: "/GalleryImg3.png",
    alt: "Volunteers planting saplings beside the Hatirjheel lake walkway",
    span: "md:col-span-1",
    position: "object-center",
  },
  {
    id: 4,
    title: "Field Crew Morning Debrief",
    location: "Agrabad Chapter",
    detail: "Coastal Relief Coordination",
    src: "/GalleryImg4.png",
    alt: "Volunteers in orange vests applauding during a morning debrief at the port",
    span: "md:col-span-2",
    position: "object-[50%_40%]",
  },
];

export default function GallerySection() {
  return (
    <section
      aria-labelledby="gallery-heading"
      className="bg-[#F8FAFF] px-4 py-12 sm:px-6 md:py-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-green-700">
            Field Memories
          </p>
          <h2
            id="gallery-heading"
            className="mt-2 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl"
          >
            Moments of Kindness Across Our Cities
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            Unfiltered glimpses of Bangladeshi youth, neighborhood collectives, and local
            elders working shoulder-to-shoulder in urban neighborhoods.
          </p>
        </header>

        {/* Bento grid: 2/3 + 1/3, then 1/3 + 2/3 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {GALLERY_ITEMS.map((item, index) => (
            <Card
              key={item.id}
            //   as="figure"
            //   shadow="none"
            //   radius="lg"
              className={`group relative h-64 w-full overflow-hidden rounded-2xl sm:h-80 md:h-[384px] ${item.span}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 768px) 66vw, 100vw"
                className={`z-0 object-cover ${item.position} transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
              />

              {/* Readability gradient behind the caption */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 z-10 h-2/5 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent"
              />

              <CardFooter
                // as="figcaption"
                className="absolute bottom-0 z-20 flex-col items-start gap-0.5 px-4 pb-4 pt-0 text-white"
              >
                <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
                <p className="text-xs text-white/80">
                  {item.location} • {item.detail}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}