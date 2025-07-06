"use client";
import ImageOverlay from "@/components/ImageOverlay";
import ScrollArrow from "@/components/Scroll";
import ScrollingTextBanner from "@/components/ScrollingBanner";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { useStrapiData } from "@/hooks/useStrapiData";
import HeroText from "@/components/HeroText";
import { useMagazineData } from "@/components/context/magazineContext";
import { createLocalImageURL } from "@/utils/urlConstruct";

export default function Home() {
  const { latestIssue, allMagazines, magazinesError } = useMagazineData();
  const [isLatestIssueBgLoaded, setIsLatestIssueBgLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});
  const heroRef = useRef(null);
  const observerRef = useRef(null);

  const [storyEntries1, setStoryEntries1] = useState([]);
  const [storyEntries2, setStoryEntries2] = useState([]);
  const [storyEntries3, setStoryEntries3] = useState([]);

  const { data: entriesApiData, error: entriesApiError } = useStrapiData(
    "/api/entries?pagination[limit]=15&populate=magazine"
  );

  useEffect(() => {
    if (entriesApiData && entriesApiData.data) {
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

  // Mouse tracking for parallax effect
  const handleMouseMove = useCallback((e) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    }
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "20px" }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Add mouse move listener to hero section
  useEffect(() => {
    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
      return () =>
        heroElement.removeEventListener("mousemove", handleMouseMove);
    }
  }, [handleMouseMove]);

  return (
    <div className="landing-pg">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-orange-400/10 to-blue-400/10 rounded-full blur-3xl transition-all duration-700 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 100}px, ${
              mousePosition.y * 100
            }px)`,
            left: "10%",
            top: "20%",
          }}
        />
        <div
          className="absolute w-64 h-64 bg-gradient-to-r from-blue-400/15 to-orange-400/15 rounded-full blur-2xl transition-all duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -80}px, ${
              mousePosition.y * -80
            }px)`,
            right: "15%",
            top: "40%",
          }}
        />
      </div>

      <section
        ref={heroRef}
        className="mouse-animation relative z-10 min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Enhanced Parallax Background Pattern */}
        <div
          className="absolute inset-0 opacity-30 transition-transform duration-500 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 40}px, ${
              mousePosition.y * 40
            }px)`,
            backgroundImage: `
              radial-gradient(circle at 20% 50%, #FF5900 4px, transparent 4px),
              radial-gradient(circle at 80% 50%, #0070ae 3px, transparent 3px),
              radial-gradient(circle at 60% 30%, #FF5900 2px, transparent 2px),
              radial-gradient(circle at 40% 70%, #0070ae 2px, transparent 2px)
            `,
            backgroundSize: "100px 100px, 150px 150px, 60px 60px, 80px 80px",
          }}
        />

        {/* Additional Moving Pattern Layer */}
        <div
          className="absolute inset-0 opacity-20 transition-transform duration-700 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -25}px, ${
              mousePosition.y * -25
            }px)`,
            backgroundImage: `
              linear-gradient(45deg, #FF5900 1px, transparent 1px),
              linear-gradient(-45deg, #0070ae 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px, 40px 40px",
          }}
        />

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
              transform: `translate(${mousePosition.x * 10}px, ${
                mousePosition.y * 10
              }px)`,
            }}
          >
            <div
              className="header-text transform transition-all duration-1000 delay-200"
              style={{
                transform: `translate(${mousePosition.x * 5}px, ${
                  mousePosition.y * 5
                }px)`,
              }}
            >
              <HeroText text="Napkins" textColor="#FF5900" />
            </div>
            <div
              className="font-display font-bold md:text-6xl md:flex md:flex-row gap-16 sm:flex-col sm:text-3xl flex-col text-4xl transform transition-all duration-1000 delay-400"
              style={{
                transform: `translate(${mousePosition.x * -5}px, ${
                  mousePosition.y * -5
                }px)`,
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
            items={[
              { title: "Winter 2024 Issue is out now!", slug: latestIssueSlug },
            ]}
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
              style={{ lineHeight: "8rem" }}
              className={`text-headline-1 max-w-[600px] mb-10 transform transition-translateY duration-1200 delay-200 ${
                isVisible["greet-section"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Welcome to Napkins!
            </h1>
            <p
              className={`text-body-large font-medium mb-15 max-w-[600px] transform transition-opacity duration-1000 delay-400 ${
                isVisible["greet-section"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              We are the independent, student-run arts organization at Minerva
              University. Established in 2022, we began as a literary & art
              magazine and have since evolved into a dynamic platform that also
              organizes interactive events.
            </p>
            <div
              className={`transform transition-all duration-1000 delay-600 ${
                isVisible["greet-section"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <button className="premium-button group relative overflow-hidden bg-[#0071ad] text-white py-4 px-10 rounded-full transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-2xl">
                <span className="absolute inset-0 bg-gradient-to-r from-[#FF5900] to-[#0071ad] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative z-10 text-body font-medium flex items-center gap-2">
                  <Link href="/about-us" className="flex items-center gap-2">
                    Learn more about us
                    <span
                      className="transform transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
          </div>
          <div
            className={`right-item flex-1 transform transition-all duration-1000 delay-300 ease-out ${
              isVisible["greet-section"]
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 translate-x-12 scale-95"
            }`}
          >
            <div className="group relative overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-700 hover:scale-105 hover:rotate-1">
              <Image
                src="/img/greet-img.jpg"
                width={500}
                height={500}
                alt="a portrait image of a napkin place on a lining"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
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
      <section
        id="stories-section"
        className="stories py-20 animate-on-scroll relative overflow-hidden"
      >
        {/* Animated background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={`absolute w-32 h-32 bg-orange-400/5 rounded-full blur-xl transition-all duration-2000 ${
              isVisible["stories-section"]
                ? "opacity-100 scale-100"
                : "opacity-0 scale-50"
            }`}
            style={{
              left: "10%",
              top: "20%",
              animationDelay: "0.5s",
            }}
          />
          <div
            className={`absolute w-24 h-24 bg-blue-400/5 rounded-full blur-lg transition-all duration-2000 delay-300 ${
              isVisible["stories-section"]
                ? "opacity-100 scale-100"
                : "opacity-0 scale-50"
            }`}
            style={{
              right: "15%",
              bottom: "30%",
            }}
          />
        </div>

        <div className="w-[85vw] mx-auto relative z-10">
          <h3
            className={`text-headline-3 mb-10 transform transition-all duration-1000 ${
              isVisible["stories-section"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Explore stories
          </h3>
        </div>

        <div
          className={`transform transition-all duration-1000 delay-200 ${
            isVisible["stories-section"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {storyEntries1.length > 0 && (
            <div className="stories-banner-wrapper">
              <ScrollingTextBanner
                items={storyEntries1}
                className="bg-transparent"
                speed="slow"
                direction="left"
                itemBaseLink="/magazines/"
                color="text-[#000] hover:text-[#FF5900] transition-all duration-300"
              />
            </div>
          )}
        </div>

        <div
          className={`transform transition-all duration-1000 delay-400 ${
            isVisible["stories-section"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {storyEntries2.length > 0 && (
            <div className="stories-banner-wrapper">
              <ScrollingTextBanner
                items={storyEntries2}
                className="bg-transparent"
                speed="slow"
                direction="right"
                itemBaseLink="/magazines/"
                color="text-[#000] hover:text-[#FF5900] transition-all duration-300"
              />
            </div>
          )}
        </div>

        <div
          className={`transform transition-all duration-1000 delay-600 ${
            isVisible["stories-section"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {storyEntries3.length > 0 && (
            <div className="stories-banner-wrapper">
              <ScrollingTextBanner
                items={storyEntries3}
                className="bg-transparent"
                speed="slow"
                direction="left"
                itemBaseLink="/magazines/"
                color="text-[#000] hover:text-[#FF5900] transition-all duration-300"
              />
            </div>
          )}
        </div>
      </section>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        .animate-text-reveal {
          animation: textReveal 1.5s ease-out forwards;
          opacity: 0;
        }

        .animate-text-reveal.delay-200 {
          animation-delay: 0.2s;
        }

        @keyframes textReveal {
          0% {
            opacity: 0;
            transform: translateY(30px) rotateX(45deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }

        .premium-button {
          position: relative;
          background: linear-gradient(135deg, #0071ad 0%, #005a8b 100%);
          box-shadow: 0 8px 32px rgba(0, 113, 173, 0.3);
        }

        .premium-button:hover {
          box-shadow: 0 12px 48px rgba(0, 113, 173, 0.4),
            0 4px 16px rgba(255, 89, 0, 0.2);
        }

        .stories-banner-wrapper {
          position: relative;
          overflow: hidden;
        }

        .stories-banner-wrapper::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0) 10%,
            rgba(255, 255, 255, 0) 90%,
            rgba(255, 255, 255, 1) 100%
          );
          pointer-events: none;
          z-index: 10;
        }

        /* Smooth scrolling for the entire page */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #0071ad, #ff5900);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #005a8b, #e04e00);
        }
      `}</style>
    </div>
  );
}
