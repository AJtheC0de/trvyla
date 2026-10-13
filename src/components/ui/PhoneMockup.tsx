import Image from "next/image";
import { cn } from "@/lib/utils";

type PhoneMockupProps = {
  src: string;
  alt: string;
  size?: "lg" | "md";
  priority?: boolean;
  className?: string;
};

/**
 * Screen cutout measured against /public/images/iphone-frame.png (759×1350, 9:16).
 * The frame PNG has a fully transparent screen area, so the screenshot is
 * layered behind it and the frame masks everything outside the cutout.
 */
const SCREEN = { left: 13, top: 7.9, right: 87, bottom: 94.8 };

export default function PhoneMockup({
  src,
  alt,
  size = "lg",
  priority,
  className,
}: PhoneMockupProps) {
  const imgSizes = size === "lg" ? "420px" : "300px";

  return (
    <div className={cn("relative isolate aspect-[9/16] w-full", className)}>
      <div
        className="absolute overflow-hidden"
        style={{
          left: `${SCREEN.left}%`,
          top: `${SCREEN.top}%`,
          right: `${100 - SCREEN.right}%`,
          bottom: `${100 - SCREEN.bottom}%`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={imgSizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>

      <Image
        src="/images/iphone-frame.png"
        alt=""
        aria-hidden
        fill
        sizes={imgSizes}
        priority={priority}
        className="pointer-events-none relative z-10 object-contain drop-shadow-[0_45px_70px_rgba(15,23,42,0.35)]"
      />
    </div>
  );
}
