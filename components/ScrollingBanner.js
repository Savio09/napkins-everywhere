import { useMemo } from "react";
import Link from "next/link";

const ScrollingTextBanner = ({
  items = [],
  className = "",
  speed = "slow",
  direction = "left",
  itemBaseLink = "/stories/",
  color,
}) => {
  const bannerGap = "20px";

  const generateDisplayItems = (itemArray) => {
    if (!itemArray || itemArray.length === 0) {
      return <span className="px-4 italic">No items to display</span>;
    }
    const repeatedItems = [];
    const minRepetitions = Math.max(5, Math.ceil(30 / itemArray.length));
    for (let i = 0; i < minRepetitions; i++) {
      repeatedItems.push(...itemArray);
    }

    return repeatedItems.map((item, index) =>
      item && item.title && item.slug ? (
        <Link
          href={`${itemBaseLink}${item.slug}`}
          key={`${item.slug}-${index}`}
          className={`px-2 ${color}`}
        >
          {item.title}/
        </Link>
      ) : null
    );
  };

  const displayContent = useMemo(
    () => generateDisplayItems(items),
    [items, itemBaseLink]
  );

  let animationDurationValue = "30s";
  if (speed === "slow") {
    animationDurationValue = "200s";
  } else if (speed === "fast") {
    animationDurationValue = "20s";
  } else if (speed === "medium") {
    animationDurationValue = "40s";
  }

  const textPClasses = `text-lg lg:text-[3rem] font-semibold tracking-wide whitespace-nowrap flex items-center`;

  const scrollingDirectionClass =
    direction === "right" ? "scroll-right" : "scroll-left";

  const scrollingBlockBaseClasses = `custom-scrolling-banner-content ${scrollingDirectionClass} flex-shrink-0 min-w-full flex items-center`; // Added flex items-center

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div
      className={`scrolling-banner-container w-full overflow-hidden bg-[#0070ae] text-white py-3 select-none ${className} flex items-center gap-[var(--banner-gap)`}
      style={{ gap: bannerGap }}
    >
      <div
        className={scrollingBlockBaseClasses}
        style={{ animationDuration: animationDurationValue }}
      >
        <div className={textPClasses}>{displayContent}</div>
      </div>
      <div
        className={scrollingBlockBaseClasses}
        aria-hidden="true"
        style={{ animationDuration: animationDurationValue }}
      >
        <div className={textPClasses}>{displayContent}</div>
      </div>
    </div>
  );
};

export default ScrollingTextBanner;
