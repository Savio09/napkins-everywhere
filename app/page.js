"use client";
import ImageOverlay from "@/components/ImageOverlay";
import ScrollArrow from "@/components/Scroll";
import ScrollingTextBanner from "@/components/ScrollingBanner";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [allMagazines, setAllMagazines] = useState([]);
  const [latestIssue, setLatestIssue] = useState(null);
  const [isLatestIssueBgLoaded, setIsLatestIssueBgLoaded] = useState(false);

  const createURL = (path) => {
    if (!path || path.startsWith("http")) {
      return path || "";
    }
    return "http://localhost:1337" + path;
  };

  useEffect(() => {
    async function fetchAndProcessMagazines() {
      try {
        const response = await fetch(
          new Request(createURL("/api/magazines?populate=*"))
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        processMagazinesClientSide(data);
      } catch (e) {
        console.error("Error fetching magazines:", e);
        setLatestIssue(null);
        setAllMagazines([]);
      }
    }

    function processMagazinesClientSide(data) {
      if (data && data.data && data.data.length > 0) {
        setAllMagazines([...data.data]);
        const sortedMagazines = [...data.data].sort((a, b) => {
          const getIssueNumber = (item) => {
            const number = item?.issue_number;
            if (typeof number !== "string") {
              return -Infinity;
            }
            const match = number.match(/issue-(\d+)/i);
            return match && match[1] ? parseInt(match[1], 10) : -Infinity;
          };
          const numA = getIssueNumber(a);
          const numB = getIssueNumber(b);
          return numB - numA;
        });
        if (sortedMagazines.length > 0) {
          setLatestIssue(sortedMagazines[0]);
        } else {
          setLatestIssue(null);
        }
      } else {
        setLatestIssue(null);
        setAllMagazines([]);
      }
    }
    fetchAndProcessMagazines();
  }, []);
  console.log(latestIssue);
  const coverImageRelativeUrl = latestIssue?.cover_img[0]?.url;
  console.log(coverImageRelativeUrl);

  const coverImageUrl = coverImageRelativeUrl
    ? createURL(coverImageRelativeUrl)
    : null;

  useEffect(() => {
    if (!coverImageUrl) {
      setIsLatestIssueBgLoaded(true); // No image to load, or treat as loaded
      return;
    }
    const img = new window.Image(); // Use window.Image for clarity in Next.js client components
    img.src = coverImageUrl;
    const handleLoad = () => setIsLatestIssueBgLoaded(true);
    img.addEventListener("load", handleLoad);
    return () => {
      img.removeEventListener("load", handleLoad);
    };
  }, [coverImageUrl]);

  const latestIssueTitle = latestIssue?.issue_title;
  const latestIssueSlug = latestIssue?.slug;
  const latestIssueLink = `/magazines/${latestIssueSlug}`;

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
        <div className="greet-section flex flex-col gap-10 md:flex-row  w-[85vw] mx-auto py-50 justify-center items-center">
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
            <button
              className="
    btn-slide-up-hover
    relative 
    overflow-hidden
    bg-[#0071ad]
    text-white
    py-2 px-5
    rounded-3xl
    transition-all duration-300 ease-in-out
    z-0 
  "
            >
              <span className="relative z-10 font-bold text-sm">
                <Link href="/about-us">
                  Learn more about us <span aria-hidden="true">→</span>
                </Link>
              </span>
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
      <ImageOverlay
        sectionTitle={"Latest Issue"}
        isLatestIssueBgLoaded={isLatestIssueBgLoaded}
        coverImageUrl={coverImageUrl}
        latestIssueLink={latestIssueLink}
        latestIssueTitle={latestIssueTitle}
      />
      <ImageOverlay
        sectionTitle={"take a peek into"}
        isLatestIssueBgLoaded={isLatestIssueBgLoaded}
        coverImageUrl={"/img/interactive-peek.jpg"}
        latestIssueLink={"/fractal"}
        latestIssueTitle={"our first interactive exhibition"}
      />

      {/* <section className="peek-section">
        <div className="peek-info">
          <p></p>
          <h1>our first interactive exhibition</h1>
          <div className="cta">
            <Image
              src="/img/interactive-peek.jpg"
              width={250}
              height={250}
              alt="a chinese lantern placed on a table with some popcorns and other snacks."
            />
          </div>
        </div>
      </section> */}
    </div>
  );
}
