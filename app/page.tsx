"use client";
import ImageOverlay from "@/components/ImageOverlay";
import ScrollArrow from "@/components/Scroll";
import ScrollingTextBanner from "@/components/ScrollingBanner";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { useEntries } from "@/hooks/useStrapi";
import HeroText from "@/components/HeroText";
import { useMagazineData } from "@/components/context/magazineContext";
import { createLocalImageURL } from "@/utils/urlConstruct";

interface StoryEntry {
  title: string;
  slug: string;
  id: number;
  magazineSlug: string;
}

export default function Home() {
  const { latestIssue, magazinesError } = useMagazineData();
  const [isLatestIssueBgLoaded, setIsLatestIssueBgLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const heroRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [storyEntries1, setStoryEntries1] = useState<StoryEntry[]>([]);
  const [storyEntries2, setStoryEntries2] = useState<StoryEntry[]>([]);
  const [storyEntries3, setStoryEntries3] = useState<StoryEntry[]>([]);

  const { data: entriesApiData, error: entriesApiError } = useEntries(
    "pagination[limit]=15&populate=magazine",
  );

  useEffect(() => {
    if (entriesApiData?.data) {
      const fetchedEntries = entriesApiData.data.map((entry) => ({
        title: entry?.title,
        slug: entry?.slug,
        id: entry?.id,
        magazineSlug: entry?.magazine?.slug || "unknown",
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
  const coverImageUrl = coverImageRelativeUrl ? createLocalImageURL(coverImageRelativeUrl) : null;

  useEffect(() => {
    if (!coverImageUrl) {
      setIsLatestIssueBgLoaded(true);
      return;
    }
    const img = new window.Image();
    img.src = coverImageUrl;
    const handleLoad = () => setIsLatestIssueBgLoaded(true);
    img.addEventListener("load", handleLoad);
    return () => img.removeEventListener("load", handleLoad);
  }, [coverImageUrl]);

  const latestIssueTitle = latestIssue?.issue_title;
  const latestIssueSlug = latestIssue?.slug;
  const latestIssueLink = `/magazines/${latestIssueSlug}`;

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    }
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "20px" },
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
      return () => heroElement.removeEventListener("mousemove", handleMouseMove);
    }
  }, [handleMouseMove]);

  return (
    <div className="landing-pg">
      <section
        ref={heroRef}
        className="mouse-animation relative z-10 min-h-screen flex items-center justify-center overflow-hidden"
      >

        <section
          id="hero-content"
          className="hero-section w-[85vw] mx-auto py-20 relative z-20 animate-on-scroll"
        >
          <div
            className={`text transform transition-all duration-1200 ease-out ${
              isVisible["hero-content"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
            style={{
              maxWidth: "800px",
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
            }}
          >
            <div
              className="header-text transform transition-all duration-1000 delay-200"
              style={{
                transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
              }}
            >
              <HeroText text="Napkins" textColor="#FF5900" />
            </div>
            <div
              className="font-display font-bold md:text-6xl md:flex md:flex-row gap-16 sm:flex-col sm:text-3xl flex-col text-4xl transform transition-all duration-1000 delay-400"
              style={{
                transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`,
              }}
            >
              <p className="text-[#0070ae] animate-text-reveal">to</p>
              <p className="animate-text-reveal delay-200">
                power and propel the art of interdisciplinary imagination
              </p>
            </div>
          </div>
          <div
            className={`arrow-dwn my-20 transform transition-all duration-1000 delay-600 ${
              isVisible["hero-content"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <ScrollArrow />
          </div>
        </section>
      </section>

      <section>
        <div className="banner">
          <ScrollingTextBanner
            items={[{ title: "Winter 2024 Issue is out now!", slug: latestIssueSlug ?? "" }]}
            className=""
            itemBaseLink="/magazines/"
          />
        </div>
        <div
          id="greet-section"
          className="greet-section flex flex-col gap-10 md:flex-row w-[85vw] mx-auto py-30 sm:py-50 justify-center items-center animate-on-scroll"
        >
          <div
            className={`left-item flex-1 transform transition-all duration-1000 ease-out ${
              isVisible["greet-section"]
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <h1
              className={`text-headline-1 max-w-[600px] mb-10 transform transition-translateY duration-1200 delay-200 ${
                isVisible["greet-section"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Welcome to Napkins!
            </h1>
            <p
              className={`text-body-large mb-15 max-w-[600px] transform transition-opacity duration-1000 delay-400 ${
                isVisible["greet-section"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              We are the independent, student-run arts organization at Minerva University.
              Established in 2022, we began as a literary & art magazine and have since evolved into
              a dynamic platform that also organizes interactive events.
            </p>
            <div
              className={`transform transition-all duration-1000 delay-600 ${
                isVisible["greet-section"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-widest underline-offset-4 hover:underline transition-opacity hover:opacity-70"
              >
                Learn more about us →
              </Link>
            </div>
          </div>
          <div
            className={`right-item flex-1 transform transition-all duration-1000 delay-300 ease-out ${
              isVisible["greet-section"]
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 translate-x-12 scale-95"
            }`}
          >
            <div className="relative overflow-hidden">
              <Image
                src="/img/greet-img.jpg"
                width={500}
                height={500}
                alt="a portrait image of a napkin place on a lining"
                className="w-full h-full object-cover"
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      <ImageOverlay
        sectionTitle={"Latest Issue"}
        isLatestIssueBgLoaded={isLatestIssueBgLoaded}
        coverImageUrl={coverImageUrl}
        latestIssueLink={latestIssueLink}
        latestIssueTitle={latestIssueTitle}
        linkText="read now"
      />

      <ImageOverlay
        sectionTitle={"take a peek into"}
        isLatestIssueBgLoaded={isLatestIssueBgLoaded}
        coverImageUrl={"/img/interactive-peek.jpg"}
        latestIssueLink={"/fractal"}
        latestIssueTitle={"our first interactive exhibition"}
      >
        <Image src="/img/interactive-peek.jpg" width={450} height={450} alt="lantern" />
      </ImageOverlay>

      <section
        id="stories-section"
        className="stories py-20 animate-on-scroll"
      >
        <div className="w-[85vw] mx-auto">
          <h3
            className={`text-headline-3 mb-10 transform transition-all duration-1000 ${
              isVisible["stories-section"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Explore stories
          </h3>
        </div>

        {[
          { entries: storyEntries1, direction: "left" as const, delay: "delay-200" },
          { entries: storyEntries2, direction: "right" as const, delay: "delay-400" },
          { entries: storyEntries3, direction: "left" as const, delay: "delay-600" },
        ].map(({ entries, direction, delay }, i) =>
          entries.length > 0 ? (
            <div
              key={i}
              className={`transform transition-all duration-1000 ${delay} ${
                isVisible["stories-section"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="stories-banner-wrapper">
                <ScrollingTextBanner
                  items={entries}
                  className="bg-transparent"
                  speed="slow"
                  direction={direction}
                  itemBaseLink="/magazines/"
                  color="text-[#000] hover:text-[#FF5900] transition-all duration-300"
                />
              </div>
            </div>
          ) : null,
        )}
      </section>

      <style jsx>{`
        .animate-text-reveal {
          animation: textReveal 1.5s ease-out forwards;
          opacity: 0;
        }
        .animate-text-reveal.delay-200 { animation-delay: 0.2s; }
        @keyframes textReveal {
          0% { opacity: 0; transform: translateY(30px) rotateX(45deg); }
          100% { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }
        .stories-banner-wrapper {
          position: relative;
          overflow: hidden;
        }
        .stories-banner-wrapper::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(90deg, rgba(250,249,247,1) 0%, rgba(250,249,247,0) 10%, rgba(250,249,247,0) 90%, rgba(250,249,247,1) 100%);
          pointer-events: none;
          z-index: 10;
        }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(45deg, #0071ad, #ff5900); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: linear-gradient(45deg, #005a8b, #e04e00); }
      `}</style>
    </div>
  );
}
