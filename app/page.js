import Image from "next/image";

export default function Home() {
  return (
    <div className="landing-pg ">
      <section className="hero-section w-[90vw] mx-auto">
        <div
          className="text"
          style={{
            maxWidth: "800px",
          }}
        >
          <div className="header-text">
            <h1 className="text-[12rem] text-[#FF5900] font-bold">Napkins</h1>
          </div>
          <div className="font-bold text-6xl flex gap-16">
            <p className="text-[#0070ae]">to</p>
            <p>power and propel the art of interdisciplinary imagination</p>
          </div>
        </div>
        <div className="arrow-dwn">
          <Image
            src="/icons/arrow_down.svg"
            alt="arrow-down"
            width={200}
            height={200}
          />
        </div>
      </section>
    </div>
  );
}
