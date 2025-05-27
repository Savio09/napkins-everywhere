"use client";
import ImageOverlay from "@/components/ImageOverlay";
import ScrollArrow from "@/components/Scroll";
import ScrollingTextBanner from "@/components/ScrollingBanner";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useStrapiData } from "@/hooks/useStrapiData";
import HeroText from "@/components/HeroText";
import { useMagazineData } from "@/components/context/magazineContext";
import { createLocalImageURL } from "@/utils/urlConstruct";

export default function Home() {
  const { latestIssue, allMagazines, magazinesError } = useMagazineData();
  const [isLatestIssueBgLoaded, setIsLatestIssueBgLoaded] = useState(false);

  const [storyEntries1, setStoryEntries1] = useState([]);
  const [storyEntries2, setStoryEntries2] = useState([]);
  const [storyEntries3, setStoryEntries3] = useState([]);

  const { data: entriesApiData, error: entriesApiError } = useStrapiData(
    "/api/entries?pagination[limit]=15"
  );

  useEffect(() => {
    if (entriesApiData && entriesApiData.data) {
      const fetchedEntries = entriesApiData.data.map((entry) => ({
        title: entry?.title,
        slug: entry?.slug,
        id: entry?.id,
      }));
      setStoryEntries1(fetchedEntries.slice(0, 5));
      setStoryEntries2(fetchedEntries.slice(5, 10));
      setStoryEntries3(fetchedEntries.slice(10, 15));
    } else if (entriesApiError) {
      setStoryEntries1([]);
      setStoryEntries2([]);
      setStoryEntries3([]);
    }
  }, [entriesApiData, entriesApiError]);

  const coverImageRelativeUrl = latestIssue?.cover_img[0]?.url;

  const coverImageUrl = coverImageRelativeUrl
    ? createLocalImageURL(coverImageRelativeUrl)
    : null;

  useEffect(() => {
    if (!coverImageUrl) {
      setIsLatestIssueBgLoaded(true);
      return;
    }
    const img = new window.Image();
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
      <section className="mouse-animation">
        {/** This is where the mouse motion tracking animation would go */}
        <section className="hero-section w-[85vw] mx-auto py-20">
          <div
            className="text"
            style={{
              maxWidth: "800px",
            }}
          >
            <div className="header-text">
              <HeroText text="Napkins" textColor="#FF5900" />
            </div>
            <div className="font-bold md:text-6xl md:flex md:flex-row gap-16 sm:flex-col sm:text-3xl flex-col text-4xl">
              <p className="text-[#0070ae]">to</p>
              <p>power and propel the art of interdisciplinary imagination</p>
            </div>
          </div>
          <div className="arrow-dwn my-20">
            <ScrollArrow />
          </div>
        </section>
      </section>
      <section>
        <div className="banner">
          <ScrollingTextBanner
            items={[
              { title: "Winter 2024 Issue is out now!", slug: latestIssueSlug },
            ]}
            className=""
            itemBaseLink="/magazines/"
          />
        </div>
        <div className="greet-section flex flex-col gap-10 md:flex-row  w-[85vw] mx-auto py-30 sm:py-50 justify-center items-center">
          <div className="left-item flex-1">
            <h1 className=" max-w-[500px] text-[3rem] sm:text-[5rem] mb-10 ">
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
      {/** Latest Issue section */}
      <ImageOverlay
        sectionTitle={"Latest Issue"}
        isLatestIssueBgLoaded={isLatestIssueBgLoaded}
        coverImageUrl={coverImageUrl}
        latestIssueLink={latestIssueLink}
        latestIssueTitle={latestIssueTitle}
        linkText="read now"
      />

      {/** Peek section */}
      <ImageOverlay
        sectionTitle={"take a peek into"}
        isLatestIssueBgLoaded={isLatestIssueBgLoaded}
        coverImageUrl={"/img/interactive-peek.jpg"}
        latestIssueLink={"/fractal"}
        latestIssueTitle={"our first interactive exhibition"}
      >
        <Image
          src="/img/interactive-peek.jpg"
          width={450}
          height={450}
          alt="lantern"
        />
      </ImageOverlay>

      {/** Explore stories section */}
      <section className="stories py-20">
        <div className="w-[85vw] mx-auto">
          <h3 className="mb-10 font-bold text-[1.5rem]">Explore stories</h3>
        </div>
        {storyEntries1.length > 0 && (
          <ScrollingTextBanner
            items={storyEntries1}
            className="bg-transparent"
            speed="slow"
            direction="left"
            color="text-[#000] hover:text-[#FF5900] transition-all"
          />
        )}
        {storyEntries2.length > 0 && (
          <ScrollingTextBanner
            items={storyEntries2}
            className="bg-transparent"
            speed="slow"
            direction="right"
            color="text-[#000] hover:text-[#FF5900] transition-all"
          />
        )}
        {storyEntries3.length > 0 && (
          <ScrollingTextBanner
            items={storyEntries3}
            className="bg-transparent "
            speed="slow"
            direction="left"
            color="text-[#000] hover:text-[#FF5900] transition-all"
          />
        )}
      </section>
    </div>
  );
}
