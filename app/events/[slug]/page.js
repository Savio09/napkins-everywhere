"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import HeroText from "@/components/HeroText";
import { useState, useEffect, useRef } from "react";
import { useStrapiData } from "@/hooks/useStrapiData";
import { createLocalImageURL } from "@/utils/urlConstruct";

export default function EventDetailPage() {
  const params = useParams();
  const { slug } = params;
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef(null);
  const [event, setEvent] = useState(null);

  // Fetch event data from Strapi
  const { data: eventData, error: eventError } = useStrapiData(
    `/api/events?filters[slug][$eq]=${slug}&populate=featured_image&populate=gallery`,
    true
  );

  useEffect(() => {
    if (eventData && eventData.data && eventData.data.length > 0) {
      setEvent(eventData.data[0]);
    }
  }, [eventData]);

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

  if (
    eventError ||
    (eventData && eventData.data && eventData.data.length === 0)
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">
            Event Not Found
          </h1>
          <Link href="/events" className="text-[#0070ae] hover:underline">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#0070ae]"></div>
      </div>
    );
  }

  const featuredImageUrl = event.featured_image
    ? createLocalImageURL(event.featured_image.url)
    : "/img/events/fractal.jpg";

  const galleryImages =
    event.gallery?.length > 0
      ? event.gallery.map((img) => createLocalImageURL(img.url))
      : [];

  const highlights = event.highlights || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="w-[85vw] mx-auto pt-8">
        <Link
          href="/events"
          className="inline-flex items-center text-[#0070ae] hover:text-blue-800 transition-colors duration-200 mb-8"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Events
        </Link>
      </div>

      {/* Hero Section */}
      <section className="w-[85vw] mx-auto mb-12">
        <div className="mb-8">
          <HeroText
            text={event.title}
            textColor="#0070ae"
            style={{ fontSize: "4rem", textTransform: "capitalize" }}
          />
        </div>
      </section>
    </div>
  );
}
