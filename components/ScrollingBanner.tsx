import { useMemo } from "react";
import Link from "next/link";

interface BannerItem {
  title: string;
  slug: string;
  magazineSlug?: string;
}

interface ScrollingTextBannerProps {
  items?: BannerItem[];
  className?: string;
  speed?: "slow" | "medium" | "fast";
  direction?: "left" | "right";
  itemBaseLink?: string;
  color?: string;
}

const SPEED_MAP: Record<string, string> = {
  slow: "200s",
  medium: "40s",
  fast: "20s",
};

const ScrollingTextBanner = ({
  items = [],
  className = "",
  speed = "slow",
  direction = "left",
  itemBaseLink = "/stories/",
  color,
}: ScrollingTextBannerProps) => {
  const bannerGap = "20px";

  const displayContent = useMemo(() => {
    if (!items || items.length === 0) {
      return <span className="px-4 italic">No items to display</span>;
    }
    const minRepetitions = Math.max(5, Math.ceil(30 / items.length));
    const repeatedItems: BannerItem[] = [];
    for (let i = 0; i < minRepetitions; i++) {
      repeatedItems.push(...items);
    }

    return repeatedItems.map((item, index) =>
      item?.title && item?.slug ? (
        <Link
          href={
            item.magazineSlug
              ? `${itemBaseLink}${item.magazineSlug}/${item.slug}`
              : `${itemBaseLink}${item.slug}`
          }
          key={`${item.slug}-${index}`}
          className={`px-2 ${color ?? ""}`}
        >
          {item.title}/
        </Link>
      ) : null,
    );
  }, [items, itemBaseLink, color]);

  const animationDuration = SPEED_MAP[speed] ?? "200s";
  const scrollingDirectionClass = direction === "right" ? "scroll-right" : "scroll-left";
  const scrollingBlockBaseClasses = `custom-scrolling-banner-content ${scrollingDirectionClass} flex-shrink-0 min-w-full flex items-center`;
  const textPClasses = "text-lg lg:text-[3rem] font-semibold tracking-wide whitespace-nowrap flex items-center";

  if (!items || items.length === 0) return null;

  return (
    <div
      className={`scrolling-banner-container w-full overflow-hidden bg-[#0070ae] text-white py-3 select-none ${className} flex items-center`}
      style={{ gap: bannerGap }}
    >
      <div className={scrollingBlockBaseClasses} style={{ animationDuration }}>
        <div className={textPClasses}>{displayContent}</div>
      </div>
      <div className={scrollingBlockBaseClasses} aria-hidden="true" style={{ animationDuration }}>
        <div className={textPClasses}>{displayContent}</div>
      </div>
    </div>
  );
};

export default ScrollingTextBanner;
