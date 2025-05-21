"use client";

import Image from "next/image";

const MouseIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="black"
    className="w-5 h-8 sm:w-6 sm:h-10"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 12.75c0 4.142-3.358 7.5-7.5 7.5s-7.5-3.358-7.5-7.5S7.858 5.25 12 5.25s7.5 3.358 7.5 7.5Z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v4.5" />{" "}
  </svg>
);

const ScrollArrow = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("next-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn("Next section with ID 'next-section' not found.");
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };
  return (
    <div className=" mx-auto w-[100px]">
      <button
        className="p-2 sm:p-3 rounded-full text-gray-600
                hover:text-[#FF5900] hover:bg-white {/* Slight bg on hover */}
                focus:outline-none focus:ring-2 focus:ring-[#FF5900] focus:ring-offset-2 focus:ring-offset-white
                dark:focus:ring-offset-slate-900 dark:text-gray-400 dark:hover:text-[#FF5900] dark:hover:bg-white
                transition-colors duration-300"
        style={{
          cursor: "pointer",
        }}
        onClick={scrollToNextSection}
      >
        <div id="animate-bounce" className="animate-bounce">
          <div className="block md:hidden">
            <MouseIcon />
          </div>
        </div>
        <div className="hidden md:block">
          <Image
            src="/icons/arrow_down.svg"
            alt="arrow-down"
            width={80}
            height={80}
          />
        </div>
      </button>
    </div>
  );
};

export default ScrollArrow;
