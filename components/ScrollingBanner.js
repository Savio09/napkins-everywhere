import { useMemo } from "react";

const ScrollingTextBanner = ({ text, className = "", speed = "slow" }) => {
  const bannerGap = "20px";

  const repeatedTextContent = useMemo(() => {
    return Array(15).fill(text).join(" \u00A0•\u00A0 ");
  }, [text]);

  let animationDurationValue = "30s";
  if (speed === "slow") {
    animationDurationValue = "40s";
  } else if (speed === "fast") {
    animationDurationValue = "10s";
  }
  const textPClasses =
    "text-lg lg:text-[5rem] font-semibold tracking-wide whitespace-nowrap";
  const scrollingBlockBaseClasses =
    "custom-scrolling-banner-content flex-shrink-0 min-w-full";

  return (
    <div
      className={`scrolling-banner-container w-full overflow-hidden bg-[#0070ae] text-white  py-3 select-none ${className} flex items-center gap-[var(--banner-gap)]`}
      style={{ gap: bannerGap }}
    >
      <div
        className={scrollingBlockBaseClasses}
        style={{ animationDuration: animationDurationValue }}
      >
        <p className={textPClasses}>{repeatedTextContent}</p>
      </div>
      <div
        className={scrollingBlockBaseClasses}
        aria-hidden="true"
        style={{ animationDuration: animationDurationValue }}
      >
        <p className={textPClasses}>{repeatedTextContent}</p>
      </div>
    </div>
  );
};

export default ScrollingTextBanner;
