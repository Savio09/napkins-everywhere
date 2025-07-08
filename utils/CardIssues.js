import Image from "next/image";
import React from "react";
import Link from "next/link";

function CardIssues({
  src,
  alt,
  slug,
  issueTitle,
  issueNumber,
  pdfLink,
  epubLink,
}) {
  // Determine available formats
  const hasPdf = pdfLink && pdfLink.trim() !== "";
  const hasEpub = epubLink && epubLink.trim() !== "";
  const webOnlyAvailable = !hasPdf && !hasEpub;

  return (
    <div className="magazine-item-wrapper">
      {/* Card with hover effects - separate from download buttons */}
      <div className="magazine-card group cursor-pointer transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
        <Link href={`/magazines/${slug}`}>
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <div className="relative transform transition-transform duration-700 group-hover:scale-110">
              <Image
                src={src}
                width={300}
                height={300}
                alt={alt}
                className="w-full h-auto object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Overlay with magazine info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-bold text-lg mb-1">{issueTitle}</h3>
              <p className="text-sm opacity-90 mb-2">Issue {issueNumber}</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Download links below the card - completely separate from hover effects */}
      <div className="mt-4">
        {webOnlyAvailable ? (
          <p className="text-sm text-gray-600 text-center italic">
            Web version available
          </p>
        ) : (
          <div className="text-center text-[1.5rem] font-bold">
            {hasPdf && (
              <>
                <span className="font-bold">View </span>
                <a
                  href={pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-gray-700 hover:text-[#FF5900] transition-colors duration-200"
                >
                  PDF
                </a>
              </>
            )}
            {hasPdf && hasEpub && <span className="mx-2 text-gray-500">|</span>}
            {hasEpub && (
              <a
                href={epubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-gray-700 hover:text-[#FF5900] transition-colors duration-200"
              >
                EPUB
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CardIssues;
