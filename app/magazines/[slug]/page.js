"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useStrapiData } from "@/hooks/useStrapiData";
import { createLocalImageURL } from "@/utils/urlConstruct";
import Image from "next/image";
import Link from "next/link";
import HeroText from "@/components/HeroText";

export default function MagazineDetail() {
  const params = useParams();
  const { slug } = params;

  // Fetch magazine data with entries
  const {
    data: magazineData,
    error: magazineError,
    fetchData: fetchMagazine,
  } = useStrapiData(
    `/api/magazines?filters[slug][$eq]=${slug}&populate=cover_img&populate=entries.media_files`,
    true
  );

  const [isLoading, setIsLoading] = useState(true);
  const [magazine, setMagazine] = useState(null);

  useEffect(() => {
    if (magazineData && magazineData.data && magazineData.data.length > 0) {
      setMagazine(magazineData.data[0]);
      setIsLoading(false);
    } else if (magazineData && magazineData.data) {
      setIsLoading(false);
    }
  }, [magazineData, magazineError, slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#0070ae]"></div>
      </div>
    );
  }

  if (magazineError || !magazine) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">
            Magazine Not Found
          </h1>
          <Link href="/magazines" className="text-[#0070ae] hover:underline">
            Back to Magazines
          </Link>
        </div>
      </div>
    );
  }

  const coverImageUrl = magazine.cover_img?.[0]
    ? createLocalImageURL(magazine.cover_img[0].url)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="w-[85vw] mx-auto pt-8">
        <Link
          href="/magazines"
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
          Back to Magazines
        </Link>
      </div>

      {/* Magazine Header */}
      <section className="w-[76vw] mx-auto mb-12">
        <div className="mb-8">
          <HeroText
            text={magazine.issue_title}
            textColor="#0070ae"
            style={{ fontSize: "4rem", textTransform: "capitalize" }}
          />
        </div>
      </section>

      {/* Main Content - Cover Image and Entries List */}
      <section className="w-[85vw] mx-auto pb-16">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Side - Cover Image */}
          <div className="lg:w-1/2 flex justify-center">
            {coverImageUrl && (
              <div className="relative group w-4/5">
                <Image
                  src={coverImageUrl}
                  width={500}
                  height={600}
                  alt={magazine.issue_title}
                  className="rounded-lg shadow-2xl transform transition-transform duration-300 group-hover:scale-105 w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
              </div>
            )}
          </div>

          {/* the entries List */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-[#0070ae] mb-6">
              Table of Contents
            </h2>

            {magazine.entries && magazine.entries.length > 0 ? (
              <div className="space-y-4">
                {magazine.entries.map((entry, index) => (
                  <Link
                    key={entry.id}
                    href={`/magazines/${magazine.slug}/${entry.slug}`}
                    className="block"
                  >
                    <div
                      className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-lg hover:scale-102 border-l-4 border-[#0070ae] cursor-pointer group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          {entry.category && (
                            <span className="inline-block bg-[#0070ae] text-white px-2 py-1 rounded text-xs font-medium mb-2 group-hover:bg-blue-700 transition-colors">
                              {entry.category}
                            </span>
                          )}
                          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#0070ae] transition-colors">
                            {entry.title}
                          </h3>
                          {entry.author && (
                            <p className="text-gray-600 italic text-sm">
                              by {entry.author}
                            </p>
                          )}
                        </div>

                        {/* Put the thumbnail by side */}
                        {entry.media_files && entry.media_files.length > 0 && (
                          <div className="ml-4 flex-shrink-0">
                            <Image
                              src={createLocalImageURL(
                                entry.media_files[0].url
                              )}
                              width={60}
                              height={60}
                              alt={entry.title}
                              className="w-16 h-16 object-cover rounded group-hover:scale-110 transition-transform"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">
                  No entries found for this magazine issue.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
