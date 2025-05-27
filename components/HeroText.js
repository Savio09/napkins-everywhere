import React from "react";

function HeroText({ text, textColor }) {
  return (
    <h1
      className={`text-[4rem] sm:text-[6rem] lg:text-[12rem] text-[${textColor}] font-bold`}
    >
      {text}
    </h1>
  );
}

export default HeroText;
