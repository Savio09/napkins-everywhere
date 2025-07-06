import Image from "next/image";
import { createLocalImageURL } from "@/utils/urlConstruct";
import Slideshow from "@/components/Slideshow";

export default function ImagesAndTextRenderer({ entry, isVisible }) {
  const isSlideshow = entry.is_slide_show;
  
  return (
    <div className="w-full">
      {entry.media_files && entry.media_files.length > 0 && (
        <div
          id="featured-media"
          className={`animate-on-scroll mb-8 transform transition-all duration-1000 ${
            isVisible["featured-media"]
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          {isSlideshow ? (
            // Slideshow Mode
            <Slideshow
              images={entry.media_files}
              title={entry.title}
              autoSlide={true}
              interval={5000}
              showThumbnails={entry.media_files.length > 3}
              className="w-full"
            />
          ) : (
            // Single Featured Image Mode
            <div className="relative group overflow-hidden rounded-lg shadow-2xl">
              <Image
                src={createLocalImageURL(entry.media_files[0].url)}
                width={900}
                height={500}
                alt={entry.title}
                className="w-full h-96 object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          )}
        </div>
      )}

      {/* Content and Images Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2">
          {entry.content && (
            <div
              id="main-content"
              className={`animate-on-scroll transform transition-all duration-1000 delay-300 mb-8 ${
                isVisible["main-content"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div
                className="newspaper-content prose prose-lg max-w-none text-gray-800 leading-relaxed prose-headings:text-[#0070ae] prose-headings:font-bold prose-p:text-gray-800 prose-p:leading-relaxed prose-p:text-lg prose-a:text-[#0070ae] prose-strong:text-gray-900 prose-em:text-gray-700"
                dangerouslySetInnerHTML={{ __html: entry.content }}
              />
            </div>
          )}
        </div>

        {/* Sidebar Images */}
        {!isSlideshow && entry.media_files && entry.media_files.length > 1 && (
          <div className="lg:col-span-1">
            <div
              id="sidebar-images"
              className={`animate-on-scroll transform transition-all duration-1000 delay-500 ${
                isVisible["sidebar-images"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h3 className="text-lg font-bold text-[#0070ae] mb-4">Gallery</h3>
              <div className="space-y-4">
                {entry.media_files.slice(1).map((media, index) => (
                  <div
                    key={media.id}
                    className="group overflow-hidden rounded-lg shadow-md transform transition-all duration-500 hover:scale-105 hover:shadow-lg"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <Image
                      src={createLocalImageURL(media.url)}
                      width={300}
                      height={200}
                      alt={`${entry.title} - Image ${index + 2}`}
                      className="w-full h-32 object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
