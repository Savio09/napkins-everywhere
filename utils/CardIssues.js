import Image from "next/image";
import React from "react";
import Link from "next/link";

function CardIssues({ src, alt, slug, issueTitle, issueNumber }) {
  return (
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
            <p className="text-sm opacity-90">Issue {issueNumber}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardIssues;
