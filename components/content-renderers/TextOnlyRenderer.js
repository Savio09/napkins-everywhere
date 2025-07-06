import Image from "next/image";
import { createLocalImageURL } from "@/utils/urlConstruct";

export default function TextOnlyRenderer({ entry, isVisible }) {
  return (
    <div className="w-full">
      <div
        id="main-content"
        className={`animate-on-scroll transform transition-all duration-1000 delay-300 mb-12 ${
          isVisible["main-content"]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div
          className="first-letter:uppercase first-letter:font-bold first-letter:text-[3rem] editorial-content newspaper-content prose prose-xl max-w-none text-gray-800 leading-relaxed prose-headings:text-[#0070ae] prose-headings:font-bold prose-p:text-gray-800 prose-p:leading-relaxed prose-a:text-[#0070ae] prose-strong:text-gray-900 prose-em:text-gray-700"
          dangerouslySetInnerHTML={{ __html: entry.content }}
        />
      </div>
    </div>
  );
}
