import ScrollArrow from "@/components/Scroll";
import ScrollingTextBanner from "@/components/ScrollingBanner";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="landing-pg">
      <section className="hero-section w-[85vw] mx-auto py-20">
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
        <div className="arrow-dwn my-20">
          <ScrollArrow />
        </div>
      </section>
      <section>
        <div className="banner">
          <ScrollingTextBanner
            text="Winter 2024 Issue is out now"
            className="my-8"
          />
        </div>
        <div className="greet-section flex flex-col md:flex-row  w-[85vw] mx-auto py-10 justify-center items-center ">
          <div className="left-item flex-1">
            <h1 className=" max-w-[500px] text-[5rem] mb-10">
              Welcome to Napkins!
            </h1>
            <p className="font-bold text-[1.2rem] mb-15 max-w-[600px]">
              We are the independent, student-run arts organization at Minerva
              University. Established in 2022, we began as a literary & art
              magazine and have since evolved into a dynamic platform that also
              organizes interactive events.
            </p>
            <button>
              <Link href="/about-us">Learn more about us</Link>
            </button>
          </div>
          <div className="right-item flex-1">
            <Image
              src="/img/greet-img.jpg"
              width={500}
              height={500}
              alt="a portrait image of a napkin place on a lining"
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
