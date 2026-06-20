import type { CSSProperties } from "react";

interface HeroTextProps {
  text: string;
  textColor: string;
  style?: CSSProperties;
}

export default function HeroText({ text, textColor, style }: HeroTextProps) {
  return (
    <h1
      style={style}
      className={`text-[4rem] sm:text-[6rem] lg:text-[12rem] text-[${textColor}] font-bold`}
    >
      {text}
    </h1>
  );
}
