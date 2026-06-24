import type { CSSProperties } from "react";

interface HeroTextProps {
  text: string;
  textColor: string;
  style?: CSSProperties;
}

export default function HeroText({ text, textColor, style }: HeroTextProps) {
  return (
    <h1
      style={{ color: textColor, ...style }}
      className="font-display text-[4rem] sm:text-[6rem] lg:text-[12rem] font-bold italic"
    >
      {text}
    </h1>
  );
}
