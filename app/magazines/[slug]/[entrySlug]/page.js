"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useStrapiData } from "@/hooks/useStrapiData";
import { createLocalImageURL } from "@/utils/urlConstruct";
import Image from "next/image";
import Link from "next/link";
import HeroText from "@/components/HeroText";
import ContentRenderer, {
  detectContentType,
} from "@/components/content-renderers/ContentRenderer";
import "@/components/content-renderers/content-renderer.css";

export default function EntryDetail() {
  const params = useParams();
  const { slug: magazineSlug, entrySlug } = params;
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef();

  // Fetch entry data with content_type field
  const {
    data: entryData,
    error: entryError,
    fetchData: fetchEntry,
  } = useStrapiData(
    `/api/entries?filters[slug][$eq]=${entrySlug}&populate=media_files&populate=magazine`,
    true
  );

  const [entry, setEntry] = useState(null);
  const [magazine, setMagazine] = useState(null);
  const [relatedEntriesData, setRelatedEntriesData] = useState(null);

  useEffect(() => {
    if (entryData && entryData.data && entryData.data.length > 0) {
      const entryItem = entryData.data[0];
      setEntry(entryItem);
      setMagazine(entryItem.magazine);
    }
  }, [entryData]);

  // Fetch related entries after entry is loaded
  useEffect(() => {
    const fetchRelatedEntries = async () => {
      if (magazine?.id && entry?.id) {
        try {
          const response = await fetch(
            `${
              process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
            }/api/entries?filters[magazine][id][$eq]=${
              magazine.id
            }&filters[id][$ne]=${
              entry.id
            }&populate=media_files&populate=magazine`
          );
          if (response.ok) {
            const data = await response.json();
            setRelatedEntriesData(data);
          }
        } catch (error) {
          console.error("Error fetching related entries:", error);
        }
      }
    };

    fetchRelatedEntries();
  }, [entry, magazine]);

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
      { threshold: 0.1, rootMargin: "100px" }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observerRef.current?.observe(el));

    // Auto-trigger visibility for elements that might already be in view
    setTimeout(() => {
      const backNavEl = document.getElementById("back-nav");

      if (backNavEl) {
        const rect = backNavEl.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (rect.top < viewportHeight + 200) {
          setIsVisible((prev) => ({
            ...prev,
            "back-nav": true,
          }));
        }
      }
    }, 500);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [entry]);

  if (!entry && !entryError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#0070ae]"></div>
      </div>
    );
  }

  if (entryError || !entry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">
            Entry Not Found
          </h1>
          <Link
            href={`/magazines/${magazineSlug}`}
            className="text-[#0070ae] hover:underline"
          >
            Back to Magazine
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link
            href="/magazines"
            className="hover:text-[#0070ae] transition-colors"
          >
            Magazines
          </Link>
          <span>/</span>
          <Link
            href={`/magazines/${magazineSlug}`}
            className="hover:text-[#0070ae] transition-colors"
          >
            {magazine?.issue_title || "Magazine"}
          </Link>
          <span>/</span>
          <span className="text-[#0070ae] font-medium">{entry.title}</span>
        </nav>
      </div>

      {/* Entry Header */}
      <section className="max-w-7xl mx-auto px-4 mb-8">
        <div className="mb-8">
          {/* Category */}
          {entry.category && (
            <div className="mb-4">
              <span className="text-gray-500 text-sm font-medium uppercase tracking-wide animate-fade-in">
                {entry.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-[#0070ae] mb-6 leading-tight animate-fade-in">
            {entry.title}
          </h1>

          {/* Author and Magazine */}
          <div className="text-lg text-gray-600 animate-fade-in-delay">
            {entry.author && (
              <span className="font-medium">by {entry.author}</span>
            )}
            {entry.author && magazine && <span className="mx-2">•</span>}
            {magazine && <span className="italic">{magazine.issue_title}</span>}
          </div>
        </div>
      </section>

      {/* Main Content - Dynamic Rendering based on Content Type */}
      <article className="max-w-7xl mx-auto px-4 pb-16">
        <ContentRenderer entry={entry} isVisible={isVisible} />

        {/* Related Entries by Category */}
        {relatedEntriesData &&
          relatedEntriesData.data &&
          relatedEntriesData.data.length > 0 && (
            <div
              id="related-entries"
              className="mt-16 p-8 bg-gray-50 rounded-xl border border-gray-200"
            >
              <h3 className="text-headline-3 text-[#0070ae] mb-8 text-center">
                More from {magazine?.issue_title || "this issue"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedEntriesData.data
                  .slice(0, 4)
                  .map((relatedEntry, index) => (
                    <Link
                      key={relatedEntry.id}
                      href={`/magazines/${
                        relatedEntry.magazine?.slug || magazineSlug
                      }/${relatedEntry.slug}`}
                      className="block group"
                    >
                      <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-l-4 border-[#0070ae] hover:border-l-8">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-subheading text-gray-900 mb-3 group-hover:text-[#0070ae] transition-colors line-clamp-2">
                              {relatedEntry.title}
                            </h4>
                            {relatedEntry.author && (
                              <p className="text-body text-gray-700 font-medium mb-1">
                                by {relatedEntry.author}
                              </p>
                            )}
                            {relatedEntry.magazine && (
                              <p className="text-caption text-gray-500 uppercase tracking-wide">
                                {relatedEntry.magazine.issue_title}
                              </p>
                            )}
                          </div>

                          {relatedEntry.media_files &&
                            relatedEntry.media_files.length > 0 && (
                              <div className="ml-6 flex-shrink-0">
                                <Image
                                  src={createLocalImageURL(
                                    relatedEntry.media_files[0].url
                                  )}
                                  width={80}
                                  height={80}
                                  alt={relatedEntry.title}
                                  className="w-16 h-16 object-cover rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                            )}
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          )}

        {/* Back Navigation */}
        <div
          id="back-nav"
          className={`animate-on-scroll mt-16 text-center transform transition-all duration-700 delay-400 ${
            isVisible["back-nav"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            href={`/magazines/${magazineSlug}`}
            className="inline-flex items-center px-6 py-3 bg-[#0070ae] text-white rounded-lg font-medium 
                     hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
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
            Back to {magazine?.issue_title || "Magazine"}
          </Link>
        </div>
      </article>
    </div>
  );
}
