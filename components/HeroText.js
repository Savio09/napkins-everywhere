import React from "react";

function HeroText({ text, textColor, style }) {
  return (
    <h1
      style={style}
      className={`text-[4rem] sm:text-[6rem] lg:text-[12rem] text-[${textColor}] font-bold`}
    >
      {text}
    </h1>
  );
}

export default HeroText;
